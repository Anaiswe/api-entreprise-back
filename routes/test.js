const axios = require("axios");
const express = require("express");
const router = express.Router();


router.get("/test", async (req, res) => {
let query = req.query.name
console.log(query)
  try {
   
    const response = await axios.get(
     
     `https://recherche-entreprises.api.gouv.fr/search?q=${query}`,
  
    );

    //console.log(response.data);

    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
