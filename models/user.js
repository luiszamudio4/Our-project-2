module.exports = function(sequelize, DataTypes){
  var User = sequelize.define("users", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    balance: DataTypes.INTEGER
  });
  User.associate = function(models){
    User.hasMany(models.Coin, {
      as: "coin",
      foreignKey: "userId",
      ondelete: "cascade"
    });
  };
  return User;
};