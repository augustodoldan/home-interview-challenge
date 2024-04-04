class ConfigurationService {
  constructor(model) {
    this.model = model; //configuration page model
  }

  //id = path name
  async getById(id) {
    try {
      const configuration = await this.model.find({ id });
      return configuration;
    } catch (error) {
      console.error('Error al obtener configuración:', error);
      throw error;
    }
  }

  async insertConfiguration(configuration) {
    try {
      const newConfiguration = await this.model.create(configuration);
      return newConfiguration;
    } catch (error) {
      console.error('Error al obtener configuración:', error);
      throw error;
    }
  }
}

module.exports = ConfigurationService;
