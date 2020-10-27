module.exports = (sequelize, DataTypes) => {
  const Bar = sequelize.define('Bar', {
    bar_name: {
      type: DataTypes.STRING,
    },
    phone_number: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    qrcode: {
      type: DataTypes.STRING,
    },
    id_owners: {
      type: DataTypes.STRING,
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
