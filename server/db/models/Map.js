module.exports = (sequelize, DataTypes) => {
  const Maps = sequelize.define('maps', {
    user_name: {
      type: DataTypes.STRING,
    },
    id_google: {
      type: DataTypes.STRING,
      unique: true
    },
    latitude: {
      type: DataTypes.DECIMAL
    },
    longitude: {
      type: DataTypes.DECIMAL
    },
    isPrivate: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  }, {
    freezeTableName: true,
  });
  return Maps;
};