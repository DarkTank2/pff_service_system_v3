

const addMetaData = require('../../hooks/add-meta-data');

const createOrderedItemExtensionMap = require('../../hooks/create-ordered-item-extension-map');

const orderedItemAssociation = require('../../hooks/ordered-item-association');

const returnFullOrderedItem = require('../../hooks/return-full-ordered-item');

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
    create: [createOrderedItemExtensionMap(), returnFullOrderedItem()],
    update: [returnFullOrderedItem()],
    patch: [returnFullOrderedItem()],
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
