require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(morgan("dev"));

mongoose.connect(process.env.MONGODB_URI, 
{ useNewUrlParser: true,
  useUnifiedTopology: true },
);

//routes
const entreprise = require("./routes/entreprise");
app.use(entreprise);
const codeNaf = require("./routes/codeNaf");
app.use(codeNaf);
const idcc = require("./routes/idcc");
app.use(idcc);
const postalCodes = require("./routes/postal");
app.use(postalCodes);
const mailForm = require ("./routes/mail");
app.use(mailForm)
const scrapedData = require ("./routes/scrapedData");
app.use(scrapedData);

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "This route doesn't exist." });
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running");
});
