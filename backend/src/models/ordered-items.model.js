const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes

module.exports = app => {
    const sequelizeClient = app.get('sequelizeClient')
    const orderedItems = sequelizeClient.define('orderedItems', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        finished: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        served: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cashed: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: true,
        updatedAt: true
    }, {
        hooks: {
            beforeCount(options) {
                options.raw = true
            }
        }
    })

    orderedItems.associate = ({ orders, items, extensions }) => {
        orderedItems.belongsTo(orders, { foreignKey: { allowNull: false }})
        orderedItems.belongsTo(items, { foreignKey: { allowNull: false }})
        orderedItems.belongsToMany(extensions, {
            through: 'orderedItemsHaveExtensions'
        })
    }
    return orderedItems
}