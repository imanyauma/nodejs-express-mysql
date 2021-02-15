const express = require("express");
const bodyParser = require("body-parser");
const https = require('https');
const fs = require('fs');
const privateKey  = fs.readFileSync('/var/run/secrets/server.key', 'utf8');
const certificate = fs.readFileSync('/var/run/secrets/server.cert', 'utf8');
const credentials = {key: privateKey, cert: certificate};
const app = express();
const httpsServer = https.createServer(credentials, app);

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/customer.routes.js")(app);

httpsServer.listen(3000);

// set port, listen for requests
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });
