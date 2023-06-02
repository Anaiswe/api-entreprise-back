const axios = require("axios");
const express = require("express");
const router = express.Router();

//routes API conventions
router.get("/conventions/:id", async (req, res) => {
  try {
    const siret = req.params.id;
    console.log(req.params.id);
    const response = await axios.get(
      `https://siret2idcc.fabrique.social.gouv.fr/api/v2/${siret}`
    );
    //325436061 SIREN
    // 32543606100015 SIRET
    // if (response.data) {
    //   if (response.data.conventions && response.data.conventions.length == 0) {
    //     console.log("empty array !");
    //   } else {
    //     console.log(res.query.convention, "not empty array");
    //   }
    // }
    //console.log(response.data[0]);
    const cleanRes = response.data[0];
    //console.log(cleanRes.conventions);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
