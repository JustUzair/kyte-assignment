import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "../../lib/db";
import Collection from "@/app/models/Collection";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const collections = await Collection.find();

    return NextResponse.json(
      {
        message: "success",
        collections,
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
    const tokenName = data.get("tokenName") as unknown as string;
    const tokenSymbol = data.get("tokenSymbol") as unknown as string;
    const walletAddress = data.get("walletAddress") as unknown as string;
    const collectionAddress = data.get(
      "collectionAddress"
    ) as unknown as string;

    // console.log(data);

    // console.log(tokenName, tokenSymbol, walletAddress);
    // Save the collection details to MongoDB
    const collection = new Collection({
      tokenName: tokenName,
      tokenSymbol: tokenSymbol,
      walletAddress: walletAddress,
      collectionAddress: collectionAddress,
    });
    await collection.save();

    return NextResponse.json(
      {
        message: "Collection saved to DB!",
        collection,
      },
      {
        status: 200,
      }
    );
  } catch (err: any) {
    console.log("🔴", err.message);

    return NextResponse.json(
      {
        message: "error",
        errorData: `🔴 🔴 ${err.message}`,
      },
      {
        status: 400,
      }
    );
  }
}
