module.exports = (sequelize, DataTypes) => {
  const Owners = sequelize.define('owners', {
    user_name: {
      type: DataTypes.STRING,
    },
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    token: {
      type: DataTypes.STRING,
    }
  }, {
    freezeTableName: true,
  });

  return Owners;
};

// // CREATE TABLE "owner" (
// //   "id" SERIAL PRIMARY KEY,
// //   "owner_id" uuid uuid_generate_v4();
// //   "first_name" varchar(255) NOT NULL,
// //   "last_name" varchar(255) NOT NULL,
// //   "password" varchar(255) NOT NULL,
// //   "email" varchar(255) NOT NULL,
// //  );