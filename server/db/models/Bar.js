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
    },
  }, {
    freezeTableName: true,
  });

  Bar.associate = (models) => {
    Bar.belongsTo(models.Owner);
  };
  Bar.associate = (models) => {
    Bar.belongsToMany(models.Customer, {
      through: Customers_Bars,
      foreignKey: 'id_bar'
    });
  };
  Bar.associate = (models) => {
    Bar.hasMany(models.Party, {
      foreignKey: 'id_bar'
    });
  };
  Bar.associate = (models) => {
    Bar.hasMany(models.Menu, {
      foreignKey: 'id_bar'
    });
  };
  return Bar;
};
