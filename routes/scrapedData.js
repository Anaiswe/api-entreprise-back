const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const router = express.Router();

// Fonction générique pour scraper le contenu d'une page en utilisant une URL et un sélecteur
const scrapePage = async (url, selector) => {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    return $(selector).text().trim();
  } catch (error) {
    console.error("Error scraping:", error);
    throw new Error("Internal Server Error");
  }
};

// gérer les erreurs 
const handleScrapingError = (res, error) => {
  console.error("Error scraping:", error);
  res.status(500).json({ error: "Internal Server Error" });
};

// normer la réponse
const sendScrapedData = (res, text, source) => {
  res.json({ text, source });
};

router.get("/infoConventionCollective", async (req, res) => {
  try {
    const IdccInfosUrl = process.env.IdccInfosUrl;
    const selector = "div.sc-85c198dc-0.iBmTcc";
    const scrapedData = await scrapePage(IdccInfosUrl, selector);
    sendScrapedData(res, scrapedData, "https://code.travail.gouv.fr/");
  } catch (error) {
    handleScrapingError(res, error);
  }
});

router.get("/infoAccordCollectif", async (req, res) => {
  try {
    const AgreementInfoUrl = process.env.AgreementInfoUrl;
    const selector = "div.sc-85c198dc-0.iBmTcc";
    const scrapedData = await scrapePage(AgreementInfoUrl, selector);
    sendScrapedData(res, scrapedData, "https://code.travail.gouv.fr/");
  } catch (error) {
    handleScrapingError(res, error);
  }
});


router.get("/infoEgapro", async (req, res) => {
  try {
    const EgaproInfoUrl = process.env.EgaproInfoUrl;

    // Scraper le premier sélecteur
    const selector1 = "#fiche-item-1 > div > p:nth-child(1)";
    const contenuTexte1 = await scrapePage(EgaproInfoUrl, selector1);

    // Scraper le deuxième sélecteur
    const selector2 = "#fiche-item-2 > div > p:nth-child(1)";
    const contenuTexte2 = await scrapePage(EgaproInfoUrl, selector2);

    // Scraper le troisième sélecteur
    const selector3 = "#fiche-item-3 > div > p";
    const contenuTexte3 = await scrapePage(EgaproInfoUrl, selector3);

    // Créer un tableau avec les textes extraits
    const textArray = [contenuTexte1, contenuTexte2, contenuTexte3];

    // Créer un objet avec les données
    const scrapedData = {
      text: textArray.join("\n"), // Concaténer les textes avec un saut de ligne
      source: "https://www.service-public.fr/",
    };

  
    res.json(scrapedData);
  } catch (error) {
    handleScrapingError(res, error);
  }
});



module.exports = router;
