const express = require("express");
const router = express.Router();

const CodePostal = require("../models/Postal");

router.get("/postal-codes", async (req, res) => {
  try {

    const prefix = parseInt(req.query.prefix);
    console.log("this prefix", prefix);

    const lowerBound = prefix * 1000;
    const upperBound = lowerBound + 999;

    const filteredCodesPostaux = await CodePostal.find({
      Code_postal: { $gte: lowerBound, $lte: upperBound }
    });

    const numberOfObjects = filteredCodesPostaux.length;
    console.log("Nombre d'objets trouvés : ", numberOfObjects);



    res.json(filteredCodesPostaux);
  } catch (error) {
    res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des codes postaux." });
  }
});

module.exports = router;
