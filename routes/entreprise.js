const axios = require("axios");
const express = require("express");
//const Joi = require('joi');
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
    limitMatchingEtablissments
  } = req.query;

  const filters = req.query;
  console.log("thiss filters", filters)
  // const filteredItems = data.filter(item => {
  //   let isValid = true;
  //   for (key in filters) {
  //     console.log("this filters2", key, item[key], filters[key]);
  //     isValid = isValid   && user[key] == filters[key];
  //   }
  //   return isValid;
  // });
  // console.log(filteredItems)

  if(req.query.search) {
    if (req.query.search.length > 0) {
      console.log("THIS REQ QUERY", req.query.search.length)
    }
  }
  console.log("This req query filters in BACK", req.query.departement)
  console.log("this req filters cp back", req.query.postalCode)

  // Valider les critères de recherche|
  try {
    //const searchCriteria = await searchCriteriaSchema.validateAsync(req.query);

    // Construire la requête pour l'API
    let apiUrl = process.env.url;
    const link = "&";
    //const paramSearchAndLink = req.query + link;
    //console.log(paramSearchAndLink)
    
    if(search) {
      apiUrl += `q=${search}${link}`;
      console.log(apiUrl);
    }

    if(siret) {
      apiUrl += `siret=${search}${link}`;
      console.log(apiUrl);
    }

    if (departement) {
      apiUrl += `departement=${departement}${link}`;
      console.log(apiUrl);
    }

    if (postalCode) {
      apiUrl += `code_postal=${postalCode}${link}`;
      console.log(apiUrl);
    }

    if (isIdcc !== undefined) {
      apiUrl += `convention_collective_renseignee=${isIdcc}${link}`;
      console.log(apiUrl);
    }

    if (page) {
      apiUrl += `page=${page}${link}`;
      console.log(apiUrl);
    }

    if (perPage) {
      apiUrl += `per_page=${perPage}${link}`
      console.log(apiUrl);
    }

    if (limitMatchingEtablissments) {
      apiUrl += `limite_matching_etablissements=${limitMatchingEtablissments}`;
    }
    console.log(apiUrl);
    
    // Envoyer la requête à l'API et renvoyer la réponse au client
    const response = await axios.get(apiUrl);
    
    const data = response.data;
    console.log("THIS DATA ORIGIN", response.data)
    //const finalDatas = Object.entries(datas)
    //console.log("THIS RESPONSE DATA", data)
    //console.log("this filter DEP", data.results)
    const filteredData = data.results.filter((item) => {
    
      return item.siege.departement === departement || item.siege.code_postal === postalCode;
    });
    console.log("this filtered data", filteredData)
    // const filteredUsers = data.filter(user => {
    //   let isValid = true;
    //   for (key in filters) {
    //     console.log(key, user[key], filters[key]);
    //     isValid = isValid && user[key] == filters[key];
    //   }
    //   console.log("this isValid", isValid)
    //   return isValid;
    // });
    // console.log("thiss filters", filteredUsers)
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


module.exports = router;