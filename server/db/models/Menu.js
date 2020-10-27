module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define('menu', {
    first_name: {
      id_bar: DataTypes.INTERGER,
    },
  }, {
    freezeTableName: true,
  });

  Menu.associate = (models) => {
    Menu.BelongsTo(models.Bar);
  };
  
  return Menu;
};
