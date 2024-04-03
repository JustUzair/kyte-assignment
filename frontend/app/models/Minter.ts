import mongoose from "mongoose";
const minterSchema = new mongoose.Schema({
  collectionAddress: { type: String, required: true },
  tokenId: { type: Number, required: true },
  owner: { type: String, required: true },
});

export default mongoose.models.Minter || mongoose.model("Minter", minterSchema);
