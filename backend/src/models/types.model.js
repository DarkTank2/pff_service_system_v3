const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes

module.exports = app => {
    const sequelizeClient = app.get('sequelizeClient')
    const types = sequelizeClient.define('types', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: true,
        updatedAt: true
    })

    types.associate = ({ items }) => {
        types.hasMany(orderedItems, {
            through: 'orderedItemsHavetypes'
        })
    }
    return tables
}