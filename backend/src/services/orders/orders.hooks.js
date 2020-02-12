

const orderAssociation = require('../../hooks/order-association');

module.exports = {
  before: {
    all: [],
    find: [orderAssociation()],
    get: [orderAssociation()],
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
};