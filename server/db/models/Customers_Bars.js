module.exports = (sequelize, DataTypes) => {
  const Customers_Bars = sequelize.define('customers_bars', {
    id_customer: {
      type: DataTypes.INTERGER,
      references: {
        model: "Customer",
        key: "id"
      }
    },
    id_bar: {
      type: DataTypes.INTERGER,
      references: {
        model: "Bar",
        key: "id"
      }
    },
  }, {
    freezeTableName: true,
  });
  return Customers_Bars;
};
