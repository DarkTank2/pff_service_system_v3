

const addMetaData = require('../../hooks/add-meta-data');

const createOrderedItemExtensionMap = require('../../hooks/create-ordered-item-extension-map');

const orderedItemAssociation = require('../../hooks/ordered-item-association');

module.exports = {
  before: {
    all: [],
    find: [orderedItemAssociation()],
    get: [orderedItemAssociation()],
    create: [addMetaData()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [createOrderedItemExtensionMap()],
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
