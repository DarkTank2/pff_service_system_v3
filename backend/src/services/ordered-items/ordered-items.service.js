// Initializes the `orderedItems` service on path `/backend/ordered-items`
const { OrderedItems } = require('./ordered-items.class');
const createModel = require('../../models/ordered-items.model');
const hooks = require('./ordered-items.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/backend/ordered-items', new OrderedItems(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('backend/ordered-items');

  service.hooks(hooks);
};
