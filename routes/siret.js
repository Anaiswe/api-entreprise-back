const axios = require("axios");
const express = require("express");
const router = express.Router();

const token = process.env.token;

//routes API conventions
router.get("/siret", async (req, res) => {
  const { number, name } = req.query;
  console.log(number, name);
  try {
    // const search = res.query;
    // console.log(search);
   
    const response = await axios.get(
      `https://api.insee.fr/entreprises/sirene/V3/siret`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
        params: {
          q: `codePostalEtablissement:${number} AND denominationUniteLegale:${name} `,
        },
      }
    );

    //console.log(response.data);

    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
