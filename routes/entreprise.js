const axios = require("axios");
const express = require("express");
const { v4: uuidv4 } = require('uuid');
const router = express.Router();


//fonction qui effectue une copie profonde
function deepCopyObject(obj) {
  //Si l'élément n'est pas de type "object" ou est nul, la fonction renvoie simplement l'objet tel quel.
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
//Si c'est un tableau, la fonction utilise la méthode map pour créer une nouvelle copie du tableau en appelant récursivement deepCopyObject pour chaque élément du tableau.
  if (Array.isArray(obj)) {
    return obj.map(item => deepCopyObject(item));
  }
//Si l'objet est un objet (et non un tableau), la fonction itère sur chaque propriété de l'objet et effectue une copie profonde récursive de chaque propriété.
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
    //  obj.id = (page - 1) * perPage + index + 1;
    obj.id = (page - 1) * perPage + index + uuidv4();
    // obj.id = `${uuidv4()}-page${page}-index${index + 1}-perPage${perPage}`;
  });
}

router.get("/entreprise", async (req, res) => {
  try {
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

    // if (!search) {
    
    //   return res.status(400).json({ error: "Le paramètre 'search' est obligatoire." });
    // }

    const params = {
      q: search,
      siret: siret,
      departement: departement,
      code_postal: postalCode,
      convention_collective_renseignee: isIdcc,
      page: page,
      per_page: perPage,
      limite_matching_etablissements: limitMatchingEtablissments,
    };

    const apiUrl = process.env.url;

    const response = await axios.get(apiUrl, { params });

    const copiedResponse = deepCopyObject(response.data);

    if (Array.isArray(copiedResponse.results)) {
      addIdToResults(copiedResponse.results, page, perPage);
      // addIdToResults(copiedResponse.results, parseInt(page), parseInt(perPage));
    }

    res.status(200).json(copiedResponse);
  } catch (error) {

    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

