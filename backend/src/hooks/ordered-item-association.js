// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const sequelize = context.app.get('sequelizeClient');
    const { types, categories, extensions, tables, items } = sequelize.models;
    context.params.sequelize = {
      include: [
        { model: extensions, attributes: ['id', 'name', 'priceModifier'] },
        { model: tables, attributes: ['id', 'name'] },
        {
          model: items, attributes: ['id', 'name', 'price'], include: [
            { model: types, attributes: ['id', 'name'] },
            { model: categories, attributes: ['id', 'name'] }
          ]
        }
      ],
      raw: false,
    };
    return context;
  };
};
