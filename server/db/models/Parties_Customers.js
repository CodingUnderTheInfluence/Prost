module.exports = (sequelize, DataTypes) => {
  const Parties_Customers = sequelize.define('parties_customers', {
    id_customer: {
      type: DataTypes.INTEGER,
      references: {
        model: "customer",
        key: "id"
      }
    },
    id_party: {
      type: DataTypes.INTEGER,
      references: {
        model: "party",
        key: "id"
      }
    },
    host: {
      type: DataTypes.INTEGER,
      references: {
        model: "customer",
        key: "id"
      }
    },
  }, {
    freezeTableName: true,
  });
  return Parties_Customers;
};
