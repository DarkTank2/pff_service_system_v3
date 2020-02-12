// Initializes the `extensions` service on path `/backend/extensions`
const { Extensions } = require('./extensions.class');
const createModel = require('../../models/extensions.model');
const hooks = require('./extensions.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: true
  };

  // Initialize our service with any options it requires
  app.use('/backend/extensions', new Extensions(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('backend/extensions');

  service.hooks(hooks);
};
