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
    id_facebook: {
      type: DataTypes.INTEGER,
    },
    id_google: {
      type: DataTypes.INTEGER,
    },
  }, {
    freezeTableName: true,
  });
  return Customer;
};
