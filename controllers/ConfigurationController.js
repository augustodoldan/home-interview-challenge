const db_simulated = require('../models/inputs.json');

class ConfigurationController {
  constructor(configurationService) {
    this.configurationService = configurationService;
  }

  /*
  returns:
    200 if configuration exists
    404 if configuration doesn't exists
  */
  get(req, res) {
    try {
      const route = req.params.path;
      console.log(route);

      let data = null;
      //@TODO AUGUSTO: VER DE HACER UN WHILE PARA BÚSQUEDA PARA NO CORTAR EL BUCLE CON BREAK
      for (const property in db_simulated) {
        if (property === route) {
          data = db_simulated[route];
          break;
        }
      }

      if (data) {
        res.status(200).send({ data });
      } else {
        throw new Error("Ruta no encontrada");
      }
    } catch (error) {
      res.status(404).send({ error: error.message });

    }
  }
}

module.exports = ConfigurationController;
