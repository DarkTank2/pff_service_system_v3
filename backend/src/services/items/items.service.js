// Initializes the `items` service on path `/backend/items`
const { Items } = require('./items.class');
const createModel = require('../../models/items.model');
const hooks = require('./items.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: true
  };
  
  // Initialize our service with any options it requires
  app.use('/backend/items', new Items(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('backend/items');

  service.hooks(hooks);
};
