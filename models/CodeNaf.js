const mongoose = require("mongoose");

const codeNafSchema = new mongoose.Schema({
  id: String,
  label: String
}, {
  collection: process.env.collection
});

const CodeNaf = mongoose.model("CodeNaf", codeNafSchema);

module.exports = CodeNaf;
