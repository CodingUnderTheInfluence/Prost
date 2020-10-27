module.exports = (sequelize, DataTypes) => {
  const Messages_Customers = sequelize.define('messages_customers', {
    id_customer: {
      type: DataTypes.INTERGER,
      references: {
        model: "Customer",
        key: "id"
      }
    },
    id_message: {
      type: DataTypes.INTERGER,
      references: {
        model: "Message",
        key: "id"
      }
    },
  }, {
    freezeTableName: true,
  });
  return Messages_Customers;
};
