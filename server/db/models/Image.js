module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('image', {
    image: {
      type: DataTypes.STRING,
    },
    id_customer: {
      type: DataTypes.INTERGER,
      reference: {
        models: 'Customers',
        key: 'id'
      }
    },
    id_message: {
      type: DataTypes.INTERGER,
      references: {
        model: "Message",
        key: "id"
      }
    },
    id_bar: {
      type: DataTypes.INTERGER,
      references: {
        model: "Bar",
        key: "id"
      }
    },
  }, {
    freezeTableName: true,
  });

  Image.associate = (models) => {
    Image.BelongsTo(models.Customers);
  };
  
  return Image;
};
