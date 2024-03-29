const mongoose = require("mongoose");

const codePostalSchema = new mongoose.Schema({
  Code_commune_INSEE: String,
  Nom_commune: String,
  Code_postal: Number,
  Libelle_acheminement: String,
  Ligne_5: String,
  coordonnees_gps: String
}, {
  collection: process.env.collectionP
});

const CodePostal = mongoose.model("CodePostal", codePostalSchema);

module.exports = CodePostal;
