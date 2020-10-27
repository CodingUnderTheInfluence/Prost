module.exports = (sequelize, DataTypes) => {
  const Party = sequelize.define('party', {
    size: {
      type: DataTypes.INTERGER,
    },
    id_bars: {
      type: DataTypes.INTERGER,
    },
  }, {
    freezeTableName: true,
  });

  Party.associate = (models) => {
    Party.belongsToMany(models.Customers, {
      through: Party_Customers,
      foreignKey: 'id_party'
    });
  };
  Party.associate = (models) => {
    Party.belongsTo(models.Bar);
  };
  return Party;
};
