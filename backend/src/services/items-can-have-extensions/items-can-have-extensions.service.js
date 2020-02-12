// Initializes the `itemsCanHaveExtensions` service on path `/backend/items-can-have-extensions`
const { ItemsCanHaveExtensions } = require('./items-can-have-extensions.class');
const createModel = require('../../models/items-can-have-extensions.model');
const hooks = require('./items-can-have-extensions.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: true
  };

  // Initialize our service with any options it requires
  app.use('/backend/items-can-have-extensions', new ItemsCanHaveExtensions(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('backend/items-can-have-extensions');

  service.hooks(hooks);
};
