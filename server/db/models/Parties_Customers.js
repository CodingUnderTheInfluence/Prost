module.exports = (sequelize, DataTypes) => {
  const Parties_Customers = sequelize.define('parties_customers', {
    id_customer: {
      type: DataTypes.INTERGER,
      references: {
        model: "Customer",
        key: "id"
      }
    },
    id_party: {
      type: DataTypes.INTERGER,
      references: {
        model: "Party",
        key: "id"
      }
    },
    host: {
      type: DataTypes.INTERGER,
      references: {
        model: "Customer",
        key: "id"
      }
    },
  }, {
    freezeTableName: true,
  });
  return Parties_Customers;
};
