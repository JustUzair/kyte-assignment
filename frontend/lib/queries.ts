import { toast } from "sonner";

export async function getAllCollections() {
  try {
    const res = await (
      await fetch(`/api/collections`, {
        method: "GET",
      })
    ).json();
    return res;
  } catch (err) {
    toast.error("Error while fetching collections");
  }
}

export async function createCollection(formData: FormData) {
  // call api, get response, convert it to json, read json

  try {
    const res = await (
      await fetch(`/api/collections`, {
        method: "POST",
        body: formData,
      })
    ).json();
    return res;
  } catch (err) {
    toast.error("Error occurred while creating collections");
  }
}

export async function saveMintedNFT(formData: FormData) {
  try {
    const res = await (
      await fetch(`/api/minters`, {
        method: "POST",
        body: formData,
      })
    ).json();
    return res;
  } catch (err) {
    toast.error("Error while saving the nft");
  }
}

export async function getNFTForUser(walletAddress: string) {
  const res = await (
    await fetch(`/api/minters?walletAddress=${walletAddress}`, {
      method: "GET",
    })
  ).json();
  return res;
}
