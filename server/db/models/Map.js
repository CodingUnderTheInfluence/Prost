module.exports = (sequelize, DataTypes) => {
  const Maps = sequelize.define('maps', {
    user_name: {
      type: DataTypes.STRING,
    },
    id_google: {
      type: DataTypes.STRING,
    },
    latitude: {
      type: DataTypes.DECIMAL
    },
    longitude: {
      type: DataTypes.DECIMAL
    }
  }, {
    freezeTableName: true,
  });
  return Maps;
};