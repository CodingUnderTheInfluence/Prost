module.exports = (sequelize, DataTypes) => {
  const Customers_Bars = sequelize.define('customers_bars', {
    id_customer: {
      type: DataTypes.INTEGER,
      references: {
        model: "customer",
        key: "id"
      }
    },
    id_bar: {
      type: DataTypes.INTEGER,
      references: {
        model: "bar",
        key: "id"
      }
    },
    favorite: {
      type: DataTypes.BOOLEAN,
    },
    checkin: {
      type: DataTypes.BOOLEAN,
    }
  }, {
    freezeTableName: true,
  });
  return Customers_Bars;
};
