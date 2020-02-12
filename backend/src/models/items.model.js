const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes

module.exports = app => {
    const sequelizeClient = app.get('sequelizeClient')
    const items = sequelizeClient.define('items', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
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

    items.associate = ({ types, categories, extensions }) => {
        items.belongsTo(types, { foreignKey: { allowNull: false } })
        items.belongsTo(categories, { foreignKey: { allowNull: false } })
        items.belongsToMany(extensions, {
            through: 'itemsCanHaveExtensions'
        })
    }
    return items
}