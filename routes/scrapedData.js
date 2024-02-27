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

const idccUrl = process.env.IdccInfosUrl;
const agreementUrl = process.env.AgreementInfoUrl;
const egaproUrl = process.env.EgaproInfoUrl;
// console.log(idccUrl)

router.get("/infoConventionCollective", async (req, res) => {
  try {

    const selector = "#content > div > div > div > div > div > table > tbody > tr > td > p";
    const scrapedData = await scrapePage(idccUrl, selector);
    sendScrapedData(res, scrapedData, idccUrl);
  } catch (error) {
    handleScrapingError(res, error);
  }
});

router.get("/infoAccordCollectif", async (req, res) => {
  try {

    const selector = "#content > div > div > div > div > div > table > tbody > tr > td > p";
    const scrapedData = await scrapePage(agreementUrl, selector);
    sendScrapedData(res, scrapedData, agreementUrl);
  } catch (error) {
    handleScrapingError(res, error);
  }
});

router.get("/infoEgapro", async (req, res) => {
  try {

    const selector = "#intro > p";
    const scrapedData = await scrapePage(egaproUrl, selector);
    sendScrapedData(res, scrapedData, egaproUrl);
  } catch (error) {
    handleScrapingError(res, error);
  }
});

module.exports = router;
