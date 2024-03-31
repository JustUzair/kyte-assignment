const mongoose = require("mongoose");

const minterSchema = new mongoose.Schema({
  collectionAddress: { type: String, required: true },
  tokenId: { type: Number, required: true },
  owner: { type: String, required: true },
});

module.exports =
  mongoose.models.Minter || mongoose.model("Minter", minterSchema);
