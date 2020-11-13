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
    city: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    zip: {
      type: DataTypes.STRING,
    },
    latitude: {
      type: DataTypes.DECIMAL,
    },
    longitude: {
      type: DataTypes.DECIMAL,
    },
    profile_image: {
      type: DataTypes.STRING(1000),
    },
    bar_capacity: {
      type: DataTypes.STRING,
    },
    id_owner: {
      type: DataTypes.INTEGER,
      reference: {
        model: 'owner',
        key: 'id',
      },
    },
  }, {
    freezeTableName: true,
  });

  return Bar;
};
