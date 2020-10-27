module.exports = (sequelize, DataTypes) => {
  const Messages_Customers = sequelize.define('messages_customers', {
    id_customer: {
      type: DataTypes.INTEGER,
      references: {
        model: "customer",
        key: "id"
      }
    },
    id_message: {
      type: DataTypes.INTEGER,
      references: {
        model: "message",
        key: "id"
      }
    },
  }, {
    freezeTableName: true,
  });
  return Messages_Customers;
};
