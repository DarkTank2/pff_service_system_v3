const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes

module.exports = app => {
    const sequelizeClient = app.get('sequelizeClient')
    const extensions = sequelizeClient.define('extensions', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        priceModifier: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    }, {
        timestamps: true,
        updatedAt: true
    })

    extensions.associate = ({ orderedItems, items }) => {
        extensions.belongsToMany(orderedItems, {
            through: 'orderedItemsHaveExtensions'
        })
        extensions.belongsToMany(items, {
            through: 'itemsCanHaveExtensions'
        })
    }
    return tables
}