require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(morgan("dev"));

//routes
const entreprise = require("./routes/entreprise");
app.use(entreprise);

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "This route doesn't exist." });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is ok!");
});
