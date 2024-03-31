"use client";
import React, { useEffect, useState } from "react";
import { Spinner } from "@/components/spinner";
import {
  useAccount,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  useAccountEffect,
  useWriteContract,
  useReadContract,
} from "wagmi";
import { getNFTForUser } from "@/lib/queries";

type Props = {};

const MyNFTs = (props: Props) => {
  const { address } = useAccount();
  const [nfts, setNfts] = useState([]);
  const [loaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!address || !loaded) return;
    if (address) {
      async function getMyNFTs() {
        const formData = new FormData();

        formData.append("walletAddress", address);

        // const res = await (
        //   await fetch(`/api/minters?walletAddress=${address}`, {
        //     method: "GET",
        //   })
        // ).json();

        const res = await getNFTForUser(address);
        console.log(res);
        setNfts(res.nfts);
      }
      getMyNFTs();
    }
  }, [address, loaded]);
  if (!loaded) return <Spinner />;

  return (
    <div className="w-[90%] mx-auto mt-10 ">
      <h1 className="text-6xl font-semibold">My NFTS</h1>
      <div className="flex flex-wrap lg:grid grid-cols-3 gap-4 mx-auto w-[80%] mt-10 text-md">
        {nfts.map((nft, index) => {
          return (
            <div
              className="w-[300px] h-[300px] border rounded-xl p-3"
              key={index}
            >
              <span className="break-words">
                <span className="font-semibold">NFT Collection Address</span> :{" "}
                {nft.collectionAddress}
              </span>
              <br />
              <span className="break-words">
                <span className="font-semibold">TokenId </span> : {nft.tokenId}
              </span>
              <br />
              <span className="break-words">
                <span className="font-semibold">Owner </span> : {nft.owner}{" "}
                {"(YOU)"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyNFTs;
