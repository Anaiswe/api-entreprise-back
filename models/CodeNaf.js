const mongoose = require("mongoose");

const codeNafSchema = new mongoose.Schema({
  id: String,
  label: String
}, {
  collection: "codes-naf" // Spécifiez le nom de la collection ici
});

const CodeNaf = mongoose.model("CodeNaf", codeNafSchema);

module.exports = CodeNaf;
