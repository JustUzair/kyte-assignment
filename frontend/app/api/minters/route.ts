import { NextRequest, NextResponse } from "next/server";
import { dbConnect, disconnect } from "../../lib/db";
import Minter from "../../models/Minter";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const walletAddress = req.nextUrl.searchParams.get("walletAddress");
    console.log(walletAddress);

    const nfts = await Minter.find({
      owner: walletAddress,
    });

    return NextResponse.json(
      {
        message: "success",
        nfts,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    // @ts-ignore

    console.log("🔴", err.message);

    return NextResponse.json(
      {
        message: "error",
        // @ts-ignore

        errorData: `🔴 🔴 ${err.message}`,
      },
      {
        status: 400,
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const data = await req.formData();
    const tokenId = data.get("tokenId") as unknown as string;
    const collectionAddress = data.get(
      "collectionAddress"
    ) as unknown as string;
    const owner = data.get("owner") as unknown as string;

    // console.log(data);

    // console.log(tokenName, tokenSymbol, walletAddress);
    // Save the minted details to MongoDB
    const minted = new Minter({
      owner: owner,
      tokenId: tokenId,
      collectionAddress: collectionAddress,
    });
    await minted.save();

    return NextResponse.json(
      {
        message: "Mint Info saved to DB!",
        minted,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    // @ts-ignore

    console.log("🔴", err.message);

    return NextResponse.json(
      {
        message: "error",
        // @ts-ignore

        errorData: `🔴 🔴 ${err.message}`,
      },
      {
        status: 400,
      }
    );
  }
}
