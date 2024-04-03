import mongoose from "mongoose";
const collectionSchema = new mongoose.Schema({
  tokenName: { type: String, required: true },
  tokenSymbol: { type: String, required: true },
  walletAddress: { type: String, required: true },
  collectionAddress: { type: String, required: true },
});

// module.exports =
//   mongoose.models.Collection || mongoose.model("Collection", collectionSchema);

export default mongoose.models.Collection ||
  mongoose.model("Collection", collectionSchema);
