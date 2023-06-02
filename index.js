// Simple sample server
// Il faut prévoir un .env pour les variables d'environnement
// install/import Cors
// Install Morgan ? (check the doc )
require('dotenv').config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

app.use(cors());
app.use(morgan('dev'))

//routes
const route1 = require("./routes/route1");
app.use(route1);
const siret = require("./routes/siret");
app.use(siret);
const entreprise = require("./routes/entreprise");
app.use(entreprise);
const routest = require("./routes/test")
app.use(routest);


app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.listen(process.env.PORT, () => {
  console.log("Server is ok!");
});
