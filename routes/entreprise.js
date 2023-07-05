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
      // console.log("THIS REQ QUERY", req.query.search.length);
    }
  }

  // Valider les critères de recherche|
  try {
    // Construire la requête pour l'API
    let apiUrl = process.env.url;
    const link = "&";

    if (search) {
      apiUrl += `q=${search}${link}`;
      //console.log(apiUrl);
    }

    if (siret) {
      apiUrl += `siret=${search}${link}`;
      //console.log(apiUrl);
    }

    if (departement) {
      apiUrl += `departement=${departement}${link}`;
      //console.log(apiUrl);
    }

    if (postalCode) {
      apiUrl += `code_postal=${postalCode}${link}`;
      //console.log(apiUrl);
    }

    if (isIdcc !== undefined) {
      apiUrl += `convention_collective_renseignee=${isIdcc}${link}`;
      //console.log(apiUrl);
    }

    if (page) {
      apiUrl += `page=${page}${link}`;
      //console.log(apiUrl);
    }

    if (perPage) {
      apiUrl += `per_page=${perPage}${link}`;
     // console.log(apiUrl);
    }

    if (limitMatchingEtablissments) {
      apiUrl += `limite_matching_etablissements=${limitMatchingEtablissments}`;
    }
    //console.log(apiUrl);

    // Envoyer la requête à l'API et renvoyer la réponse au client
    const response = await axios.get(apiUrl);

    const data = response.data;
     console.log("THIS DATA ORIGIN", response.data);
  
    // console.log("this new url to request", newUrl)
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


module.exports = router;
