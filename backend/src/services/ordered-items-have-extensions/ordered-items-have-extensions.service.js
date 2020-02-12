// Initializes the `orderedItemsHaveExtensions` service on path `/backend/ordered-items-have-extensions`
const { OrderedItemsHaveExtensions } = require('./ordered-items-have-extensions.class');
const createModel = require('../../models/ordered-items-have-extensions.model');
const hooks = require('./ordered-items-have-extensions.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: true
  };

  // Initialize our service with any options it requires
  app.use('/backend/ordered-items-have-extensions', new OrderedItemsHaveExtensions(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('backend/ordered-items-have-extensions');

  service.hooks(hooks);
};
