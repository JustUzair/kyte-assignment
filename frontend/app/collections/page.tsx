"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ERC721Minter from "@/artifacts/ERC721Minter.json";
import { CollectionMasterContract } from "@/lib/constants";
import { toast } from "sonner";
import {
  useAccount,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  useAccountEffect,
  useWriteContract,
  useReadContract,
} from "wagmi";
import { Spinner } from "@/components/spinner";
import Web3 from "web3";
import NFTDialog from "./_components/NFTDialog";
import { useRouter } from "next/navigation";
import { createCollection, getAllCollections } from "@/lib/queries";

type Props = {};

const CollectionsPage = (props: Props) => {
  const { address } = useAccount();
  const web3 = new Web3(window.ethereum);

  const abi = ERC721Minter.abi;
  const { writeContractAsync } = useWriteContract();
  //   const { disconnect } = useDisconnect();
  //   const { data: ensName } = useEnsName({ address });
  //   const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenURI, setTokenURI] = useState("");
  const [collections, setCollections] = useState([]);
  const [loaded, setIsLoaded] = useState(false);

  const [collectionAdded, setCollectionAdded] = useState(false);

  const router = useRouter();
  useEffect(() => {
    async function getCollections() {
      if (loaded && !address) {
        toast.error("Please connect your wallet");
        return;
      }

      const res = await getAllCollections();
      console.log(res);
      setCollections(res.collections);
      setIsLoaded(true);
    }
    getCollections();
  }, []);
  async function handleCreateCollection() {
    try {
      if (!address) {
        toast.error("Please connect your wallet");
        return;
      }
      if (!tokenSymbol || !tokenName || !tokenURI) {
        toast.warning("Please fill the info");
        return;
      }

      //   const txHash = await writeContractAsync({
      //     abi,
      //     address: CollectionMasterContract,
      //     functionName: "createCollection",
      //     args: [tokenName, tokenSymbol, tokenURI],
      //   });

      const masterContractInstance = new web3.eth.Contract(
        abi,
        CollectionMasterContract
      );

      const createRes = await masterContractInstance.methods
        .createCollection(tokenName, tokenSymbol, tokenURI)
        .send({ from: address });
      console.log(createRes);

      const collectionsResult = await masterContractInstance.methods
        .getCollections(address)
        .call();
      // console.log("use effect hook web3 \n", collectionsResult);

      if (createRes && collectionsResult) {
        const formData = new FormData();
        formData.append("tokenName", tokenName);
        formData.append("tokenSymbol", tokenSymbol);
        // formData.append("tokenURI", tokenURI);
        formData.append("walletAddress", address);
        console.log(collectionsResult);

        formData.append(
          "collectionAddress",
          collectionsResult[collectionsResult.length - 1]
        );

        const res = await createCollection(formData);
        console.log(res);

        toast.success(`${res.message}`);
        location.reload();
      }
    } catch (err) {
      // @ts-ignore

      toast.error(err.message);
    }
  }

  if (!loaded) return <Spinner />;
  return (
    <div className="w-[90vw] mx-auto">
      <h1 className="text-6xl font-semibold mt-4">NFT Collections</h1>
      <div className="w-full flex items-center justify-end mt-10">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default" className="bg-primary text-white">
              Create Collection
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Collection</DialogTitle>
              <DialogDescription>
                Create your own nft collection
              </DialogDescription>
            </DialogHeader>
            <div className="lg:grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  defaultValue=""
                  placeholder="Token Name"
                  className="col-span-3"
                  onChange={e => {
                    setTokenName(e.target.value);
                  }}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Symbol
                </Label>
                <Input
                  id="symbol"
                  defaultValue=""
                  placeholder="Token Symbol"
                  className="col-span-3"
                  onChange={e => {
                    setTokenSymbol(e.target.value);
                  }}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  URI
                </Label>
                <Input
                  id="uri"
                  defaultValue=""
                  placeholder="Token URI"
                  className="col-span-3"
                  onChange={e => {
                    setTokenURI(e.target.value);
                  }}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreateCollection}>
                Create Collection
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div>
        {/* {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />} */}
        {address ? <div>{address}</div> : <div>Connect your wallet</div>}
        {/* <button onClick={() => disconnect()}>Disconnect</button> */}
      </div>

      <div className="flex flex-wrap lg:grid grid-cols-4 gap-4 mt-10 w-[90%] mx-auto">
        {collections &&
          collections.map((collection, index) => {
            return <NFTDialog key={index} collection={collection} />;
          })}
      </div>
    </div>
  );
};

export default CollectionsPage;
