

const itemAssociation = require('../../hooks/item-association');

const createItemExtensionsMap = require('../../hooks/create-item-extensions-map');

const returnFullItem = require('../../hooks/return-full-item');

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
    create: [createItemExtensionsMap(), returnFullItem()],
    update: [createItemExtensionsMap(), returnFullItem()],
    patch: [createItemExtensionsMap(), returnFullItem()],
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
