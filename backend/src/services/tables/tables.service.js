// Initializes the `tables` service on path `/backend/tables`
const { Tables } = require('./tables.class')
const createModel = require('../../models/tables.model')
const hooks = require('./tables.hooks')

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: true
  }

  // Initialize our service with any options it requires
  app.use('/backend/tables', new Tables(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('backend/tables')

  service.hooks(hooks)
}
