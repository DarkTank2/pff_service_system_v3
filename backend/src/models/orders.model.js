const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes

module.exports = app => {
    const sequelizeClient = app.get('sequelizeClient')
    const orders = sequelizeClient.define('orders', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        kellner: {
            type: DataTypes.STRING,
            allowNull: false
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: true,
        updatedAt: true
    })

    orders.associate = models => { // eslint-disable-line no-unused-vars
        const { tables, orderedItems } = models
        orders.belongsTo(tables, {
            foreignKey: {
                allowNull: false
            }
        })
        orders.hasMany(orderedItems, {
            foreignKey: {
                allowNull: false
            }
        })
    }
    return tables
}