var bcrypt = require("bcryptjs");
module.exports = function(sequelize, DataTypes){
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1]
      }
    },
    usdBalance: DataTypes.INTEGER
  });

  User.associate = function(models){
    User.hasMany(models.Coin, {
      as: "coinOwned",
      foreignKey: models.Coin.id,
      ondelete: "cascade"
    });
  };

  User.prototype.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
  };

  User.addHook("beforeCreate", function(user){
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  return User;
};