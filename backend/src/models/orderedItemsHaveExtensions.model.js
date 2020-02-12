const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes

module.exports = app => {
    const sequelizeClient = app.get('sequelizeClient')
    const orderedItemsHaveExtensions = sequelizeClient.define('orderedItemsHaveExtensions', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    }, {
        timestamps: true,
        updatedAt: false
    })

    orderedItemsHaveExtensions.associate = ({ orderedItems, extensions }) => {
        orderedItemsHaveExtensions.belongsTo(orderedItems, { foreignKey: { allowNull: false }})
        orderedItemsHaveExtensions.belongsTo(extensions, { foreignKey: { allowNull: false }})
      
    }
    return tables
}