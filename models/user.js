module.exports = function(sequelize, DataTypes){
  var User = sequelize.define("User", {
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
    usdBalance: DataTypes.INTEGER
  });
  User.associate = function(models){
    User.hasMany(models.Coins, {
      as: "coin",
      foreignKey: models.Coins.id,
      ondelete: "cascade"
    });
  };
  return User;
};