const axios = require("axios");
const express = require("express");
const router = express.Router();

//routes API conventions
router.get("/conventions/:id", async (req, res) => {
  try {
    const apiUrl = process.env.idccUrl;
    const siret = req.params.id;
    console.log(req.params.id);
    const response = await axios.get(
      `${apiUrl}${siret}`
    );


    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;