const { Data } = require("@react-google-maps/api");

module.exports = (sequelize, DataTypes) => {
    const Drinks = sequelize.define('drinks', {
        id_customer: {
            type: DataTypes.INTEGER,
            references: {
                model: "customer",
                key: "id"
            }
        },
        drink_Count: {
            type: DataTypes.INTEGER,
        }
    }, {
        freezeTableName: true,
    });
    return Drinks;
};