const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes

module.exports = app => {
    const sequelizeClient = app.get('sequelizeClient')
    const itemsCanHaveExtensions = sequelizeClient.define('itemsCanHaveExtensions', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    }, {
        timestamps: true,
        updatedAt: false
    }, {
        hooks: {
            beforeCount(options) {
                options.raw = true
            }
        }
    })

    itemsCanHaveExtensions.associate = ({ items, extensions }) => {
        itemsCanHaveExtensions.belongsTo(items, { foreignKey: { allowNull: false }})
        itemsCanHaveExtensions.belongsTo(extensions, { foreignKey: { allowNull: false }})
      
    }
    return itemsCanHaveExtensions
}