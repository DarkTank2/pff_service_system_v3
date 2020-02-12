const tables = require('./tables/tables.service.js');
const orders = require('./orders/orders.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(tables);
  app.configure(orders);
};
