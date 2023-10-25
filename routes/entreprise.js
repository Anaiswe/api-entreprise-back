const axios = require("axios");
const express = require("express");
const router = express.Router();


function deepCopyObject(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => deepCopyObject(item));
  }

  const copiedObject = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      copiedObject[key] = deepCopyObject(obj[key]);
    }
  }

  return copiedObject;
}

// Fonction pour ajouter un ID à chaque objet dans le tableau "results"
function addIdToResults(results, page, perPage) {
  results.forEach((obj, index) => {
     // L'ID est basé sur la page, l'index et le nombre d'éléments par page
     obj.id = (page - 1) * perPage + index + 1;
  });
}


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
    const copiedResponse = deepCopyObject(response.data);

    if (copiedResponse.results && Array.isArray(copiedResponse.results)) {
      addIdToResults(copiedResponse.results, page, perPage);
    }

    res.status(200).json(copiedResponse);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


module.exports = router;
