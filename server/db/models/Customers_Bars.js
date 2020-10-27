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
  }, {
    freezeTableName: true,
  });
  return Customers_Bars;
};
