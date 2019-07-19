var bcrypt = require("bcryptjs");

// ------------------ SEQUALIZE - DB TABLES
module.exports = function(sequelize, DataTypes){
  var Users = sequelize.define("Users", {
    // ------------------ USERNAME
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // ------------------ EMAIL
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    // ------------------ PASSWORD
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1]
      }
    },
    usdBalance: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 30000.00
    }
  });

  // ------------------ COINS OWNED
  Users.associate = function(models){
    Users.hasOne(models.Portfolios, {
      as: "portfolio",
      foreignKey: models.Portfolios.id,
      ondelete: "cascade"
    });
  };

  // ------------------ VALIDATION
  Users.prototype.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
  };

  // ------------------ AUTHENTICATION
  Users.addHook("beforeCreate", function(user){
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  return Users;
};