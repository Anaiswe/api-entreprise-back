const express = require("express");
const router = express.Router();

const CodePostal = require("../models/Postal");

// Route pour obtenir tous les codes postaux
router.get("/postal-codes", async (req, res) => {
  try {
    const codesPostaux = await CodePostal.find();
    res.json(codesPostaux);
  } catch (error) {
    res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des codes postaux." });
  }
});

// Vous pouvez ajouter d'autres routes pour la création, la mise à jour et la suppression de codes postaux si nécessaire.

module.exports = router;
