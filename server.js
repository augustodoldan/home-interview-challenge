const express = require("express");
const next = require("next");
const bodyParser = require('body-parser');
const cors = require('cors');
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

//Configuration requires
const ConfigurationModel = require("./models/configuration");
const ConfigurationService = require("./services/ConfigurationService");
const ConfigurationController = require("./controllers/ConfigurationController");

//Configuration instances
const ConfigurationServiceInstance = new ConfigurationService(
  ConfigurationModel
);

const ConfigurationControllerInstance = new ConfigurationController(
  ConfigurationServiceInstance
);

app.prepare().then(() => {
  const server = express();
  server.use(bodyParser.json())
  server.use(cors());

  //get configuration by path
  server.get("/configuration/:path", (req, res) =>
    ConfigurationControllerInstance.get(req, res)
  );

  server.post("/configuration", (req, res) =>
    ConfigurationControllerInstance.insertConfiguration(req, res)
  );
  server.post("/:path", (req, res) => {
    console.log(req.body);

    return res.sendStatus(200);
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
