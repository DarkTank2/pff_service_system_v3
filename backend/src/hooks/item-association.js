// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const sequelize = context.app.get('sequelizeClient');
    const { types, categories, extensions } = sequelize.models;
    context.params.sequelize = {
      include: [
        { model: types, attributes: ['id', 'name'] }, 
        { model: categories, attributes: ['id', 'name'] },
        { model: extensions, attributes: ['id', 'name', 'priceModifier'] }
      ],
      raw: false,
    };
    return context;
  };
};
