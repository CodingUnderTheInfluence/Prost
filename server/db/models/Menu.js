module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define('menu', {
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
 
  return Menu;
};
