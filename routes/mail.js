const express = require("express");
const router = express.Router();
const formData = require("form-data");
const Mailgun = require("mailgun.js");

router.use(express.json());

/* MAILGUN CONFIGURATION */
const mailgun = new Mailgun(formData);
const client = mailgun.client({
  username: "Anais",
  key: process.env.apiKeyMg,
});


router.post("/form", async (req, res) => {
    try {
      const { firstname, lastname, email, subject, message } = req.body;
  
      if (firstname && lastname && email && message) {
        const messageData = {
          from: `${firstname} ${lastname} <${email}>`,
          to: process.env.emailAdmin,
          subject: subject || `mail`,
          text: message,
        };
  
        const response = await client.messages.create(
          process.env.domainMg,
          messageData
        );
  
        res.status(200).json(response);
      } else {
        res.status(400).json({ message: "Missing parameters" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;