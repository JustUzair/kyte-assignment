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
import CustomNFT from "@/artifacts/CustomNFT.json";

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
import { useRouter } from "next/navigation";
import { saveMintedNFT } from "@/lib/queries";
type Props = {
  collection: {
    tokenName: string;
    tokenSymbol: string;
    walletAddress: string;
    collectionAddress: string;
  };
};

const NFTDialog = ({ collection }: Props) => {
  const { address } = useAccount();
  const router = useRouter();
  const web3 = new Web3(window.ethereum);
  const [tokenId, setTokenId] = useState(-1);
  const [loaded, setIsLoaded] = useState(false);

  async function mintNFT() {
    try {
      if (loaded && !address) {
        toast.error("Please connect your wallet");
        return;
      }
      const masterCollectionInstance = new web3.eth.Contract(
        ERC721Minter.abi,
        CollectionMasterContract
      );
      console.log(collection.collectionAddress);
      const collectionOwner = await masterCollectionInstance.methods
        .ownerOf(collection.collectionAddress)
        .call();

      const collectionsResult = await masterCollectionInstance.methods
        .mintNFT(collectionOwner, collection.collectionAddress)
        .send({ from: address });

      console.log(collectionsResult);

      // const message = `${collectionsResult.events.NFTMinted.returnValues[1]} minted with tokenID ${collectionsResult.events.NFTMinted.returnValues[2]}`;

      // console.log(message);

      if (collectionsResult) {
        const formData = new FormData();
        formData.append(
          "tokenId",
          collectionsResult.events.NFTMinted.returnValues[2]
        );

        formData.append("owner", address);
        formData.append("collectionAddress", collection.collectionAddress);

        // call api, get response, convert it to json, read json
        //   const res = await (
        //     await fetch(`/api/minters`, {
        //       method: "POST",
        //       body: formData,
        //     })
        //   ).json();
        const res = await saveMintedNFT(formData);
        console.log(res);

        toast.success(`${res.message}`);
        setTimeout(() => {
          router.push("/my-nfts");
        }, 1000);
      }
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function getTokenID() {
    const collectionInstance = new web3.eth.Contract(
      CustomNFT.abi,
      collection.collectionAddress
    );
    const newTokenID = await collectionInstance.methods
      .getCurrentTokenId()
      .call();
    // const tokenURI = await collectionInstance.methods.tokenURI(tokenId).call();
    console.log(newTokenID);
    setTokenId(newTokenID);

    return newTokenID;
  }

  useEffect(() => {
    setIsLoaded(true);
  }, []);
  if (!loaded) return <Spinner />;

  return (
    <Dialog>
      {" "}
      <DialogTrigger asChild>
        <div className="w-[250px] h-[250px] border rounded-sm p-2 cursor-pointer hover:scale-110 transition-all hover:bg-primary hover:text-white">
          <span className="text-md flex items-center justify-center italic underline">
            Click card to mint
          </span>

          <span className="flex flex-col items-center justify-center">
            <span>{collection.tokenSymbol} </span>
            <span className="break-words w-[100%]">
              <span className="font-semibold">Created by:</span>{" "}
              {collection.walletAddress}
            </span>
            <br />
            <span className="break-words w-[100%]">
              <span className="font-semibold">Collection Address :</span>{" "}
              {collection.collectionAddress}
            </span>
          </span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <span className="flex flex-col items-center justify-center">
          <span>{collection.tokenSymbol} </span>
          <span className="break-words w-[100%]">
            <span className="font-semibold">Created by:</span>{" "}
            {collection.walletAddress}
          </span>
          <br />
          <span className="break-words w-[100%]">
            <span className="font-semibold">Collection Address :</span>{" "}
            {collection.collectionAddress}
          </span>
        </span>
        <Button variant="default" onClick={mintNFT}>
          Mint NFT from Collection {collection.tokenSymbol}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default NFTDialog;
