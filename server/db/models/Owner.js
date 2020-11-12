module.exports = (sequelize, DataTypes) => {
  const Owners = sequelize.define('owners', {
    user_name: {
      type: DataTypes.STRING,
    },
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    token: {
      type: DataTypes.STRING,
    }
  }, {
    freezeTableName: true,
  });

  return Owners;
};
