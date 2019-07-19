var bcrypt = require("bcryptjs");

// ------------------ SEQUALIZE - DB TABLES
module.exports = function(sequelize, DataTypes){
  var user = sequelize.define("user", {
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
  User.associate = function(models){
    User.hasMany(models.Coin, {
      as: "coinsOwned",
      foreignKey: models.Coin.id,
      ondelete: "cascade"
    });
  };

  // ------------------ VALIDATION
  User.prototype.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
  };

  // ------------------ AUTHENTICATION
  User.addHook("beforeCreate", function(user){
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  return User;
};