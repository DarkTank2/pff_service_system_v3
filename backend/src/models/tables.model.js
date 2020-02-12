const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes

module.exports = app => {
    const sequelizeClient = app.get('sequelizeClient')
    const tables = sequelizeClient.define('tables', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        timestamps: true,
        updatedAt: true
    })

    tables.associate = models => { // eslint-disable-line no-unused-vars
        const { orders } = models
        tables.hasMany(orders, {
            foreignKey: {
                allowNull: false
            }
        })
    }
    return tables
}