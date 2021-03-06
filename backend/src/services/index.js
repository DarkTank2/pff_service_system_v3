const tables = require('./tables/tables.service.js')
const types = require('./types/types.service.js')
const orderedItems = require('./ordered-items/ordered-items.service.js')
const items = require('./items/items.service.js')
const extensions = require('./extensions/extensions.service.js')
const categories = require('./categories/categories.service.js')
const itemsCanHaveExtensions = require('./items-can-have-extensions/items-can-have-extensions.service.js')
const orderedItemsHaveExtensions = require('./ordered-items-have-extensions/ordered-items-have-extensions.service.js')
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(tables)
  app.configure(types)
  app.configure(orderedItems)
  app.configure(items)
  app.configure(extensions)
  app.configure(categories)
  app.configure(itemsCanHaveExtensions)
  app.configure(orderedItemsHaveExtensions)
}
