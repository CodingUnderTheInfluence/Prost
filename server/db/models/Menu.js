module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define('menu', {
    id_bar: {
      type: DataTypes.INTEGER,
      reference: {
        model: 'bar',
        key: 'id',
      },
    },
    image: {
      type: DataTypes.STRING,
    },
    info: {
      type: DataTypes.STRING,
    },
  }, {
    freezeTableName: true,
  });

  return Menu;
};
