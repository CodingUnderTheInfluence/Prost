module.exports = (sequelize, DataTypes) => {
  const Owners = sequelize.define('owners', {
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    user_name: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    facebookId: {
      type: DataTypes.INTEGER,
    },
    googleId: {
      type: DataTypes.INTEGER,
    },
  }, {
    freezeTableName: true,
  });

  return Owners;
};
