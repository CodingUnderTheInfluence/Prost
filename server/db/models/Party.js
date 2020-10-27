module.exports = (sequelize, DataTypes) => {
  const Party = sequelize.define('party', {
    size: {
      type: DataTypes.INTEGER,
    },
    id_bar: {
      type: DataTypes.INTEGER,
      reference: {
        model: "bar",
        key: "id"
      }
    },
  }, {
    freezeTableName: true,
  });

  return Party;
};
