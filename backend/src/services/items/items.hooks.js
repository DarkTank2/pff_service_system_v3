

const itemAssociation = require('../../hooks/item-association');

module.exports = {
  before: {
    all: [],
    find: [itemAssociation()],
    get: [itemAssociation()],
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
