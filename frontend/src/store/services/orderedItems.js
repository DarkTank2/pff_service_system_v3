import feathersClient, { makeServicePlugin, BaseModel } from '../../feathers-client'

class OrderedItems extends BaseModel {
  // eslint-disable-next-line no-useless-constructor
  constructor (data, options) {
    super(data, options)
  }
  // Required for $FeathersVuex plugin to work after production transpile.
  static modelName = 'OrderedItems'
  // Define default properties here
  static instanceDefaults () {
    return {
      quantity: 0,
      waiter: '',
      comment: '',
      extensions: [],
      table: {},
      item: {}
    }
  }
}
const servicePath = '/backend/ordered-items'
const servicePlugin = makeServicePlugin({
  Model: OrderedItems,
  service: feathersClient.service(servicePath),
  servicePath
})

// Setup the client-side Feathers hooks.
feathersClient.service(servicePath).hooks({
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },
  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },
  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
})

export default servicePlugin
