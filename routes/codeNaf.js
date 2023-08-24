const express = require("express");
const router = express.Router();

const CodeNaf = require("../models/CodeNaf");

router.get("/codes-naf", async (req, res) => {
    try {
      const codesNaf = await CodeNaf.find();
      res.json(codesNaf);
    } catch (error) {
      res.status(500).json({ message: "An error occurred while fetching codes NAF." });
    }
  });

  module.exports = router;