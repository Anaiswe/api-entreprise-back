const axios = require("axios");
const express = require("express");
const router = express.Router();

router.get("/entreprise", async (req, res) => {
  const {
    search,
    siret,
    departement,
    postalCode,
    isIdcc,
    page,
    perPage,
    limitMatchingEtablissments,
  } = req.query;


  if (req.query.search) {
    if (req.query.search.length > 0) {
   
    }
  }

  try {
    // build api request
    let apiUrl = process.env.url;
    const link = "&";

    if (search) {
      apiUrl += `q=${search}${link}`;
      
    }

    if (siret) {
      apiUrl += `siret=${search}${link}`;
      
    }

    if (departement) {
      apiUrl += `departement=${departement}${link}`;
      
    }

    if (postalCode) {
      apiUrl += `code_postal=${postalCode}${link}`;
      
    }

    if (isIdcc !== undefined) {
      apiUrl += `convention_collective_renseignee=${isIdcc}${link}`;
      
    }

    if (page) {
      apiUrl += `page=${page}${link}`;
      
    }

    if (perPage) {
      apiUrl += `per_page=${perPage}${link}`;
     
    }

    if (limitMatchingEtablissments) {
      apiUrl += `limite_matching_etablissements=${limitMatchingEtablissments}`;
    }

    const response = await axios.get(apiUrl);
    const data = response.data;
    res.status(200).json(data);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


module.exports = router;
