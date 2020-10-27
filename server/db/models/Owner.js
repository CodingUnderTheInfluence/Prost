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
      type: DataTypes.INTERGER,
    },
    googleId: {
      type: DataTypes.INTERGER,
    },
  }, {
    freezeTableName: true,
  });

  Owners.associate = (models) => {
    Owners.hasMany(models.Bar, {
      foreignKey: 'id_owner'
    });
  };
  return Owners;
};
