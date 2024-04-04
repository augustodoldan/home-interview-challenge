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

  async insertConfiguration(req, res) {
    try {
      const configuration = req.body;

      const newConfiguration = await this.configurationService.insertConfiguration(configuration);

      if (newConfiguration) {
        res.status(201).send({ data: newConfiguration });
      } else {

        res.status(500).send({ error: 'Internal server error' });
      }
    } catch (error) {
      console.error('Error inserting configuration:', error);
      res.status(400).send({ error: 'Error creating configuration' }); // Consider specific error messages
    }
  }


  async get(req, res) {

    /*     try {
          const route = req.params.path;
          const configuration = await this.configurationService.getById(route);
    
          if (configuration) {
            res.status(200).send({ data: configuration });
          } else {
            res.status(404).send({ error: 'Ruta no encontrada' });
          }
        } catch (error) {
          console.error('Error al obtener configuración:', error);
          res.status(500).send({ error: 'Error interno del servidor' });
        }
     */


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
