module.exports = (sequelize, DataTypes) => {
  const Bar = sequelize.define('bar', {
    bar_name: {
      type: DataTypes.STRING,
    },
    phone_number: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    latitude: {
      type: DataTypes.DECIMAL
    },
    longitude: {
      type: DataTypes.DECIMAL
    },
    qrcode: {
      type: DataTypes.STRING,
    },
    id_owner: {
      type: DataTypes.INTEGER,
      reference: {
        model: "owner",
        key: "id"
      }
    },
  }, {
    freezeTableName: true,
  });

  return Bar;
};
