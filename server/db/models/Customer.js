module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('customer', {
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    user_name: {
      type: DataTypes.STRING,
    },
    facebookId: {
      type: DataTypes.INTERGER,
    },
    googleId: {
      type: DataTypes.INTERGER,
    },
  }, {
    freezeTableName: true,
  });

  Customer.associate = (models) => {
    Customer.hasOne(models.eContact);
  };
  Customer.associate = (models) => {
    Customer.hasOne(models.Image);
  };
  Customer.associate = (models) => {
    Customer.belongsToMany(models.Bars, {
      through: Customers_Bars,
      foreignKey: 'id_customer',
    });
  };
  Customer.associate = (models) => {
    Customer.belongsToMany(models.Messages, {
      through: Customers_Messages,
      foreignKey: 'id_customer',
    });
  };
  Customer.associate = (models) => {
    Customer.belongsToMany(models.Parties, {
      through: Parties_Customers,
      foreignKey: 'id_customer',
    });
  };
  Customer.associate = (models) => {
    Customer.belongsTo(models.Parties, {
      through: Parties_Customers,
      as: 'host',
    });
  };
  return Customer;
};
