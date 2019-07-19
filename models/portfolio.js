module.exports = function(sequelize, DataTypes){
  var Portfolios = sequelize.define("Portfolios", {
    name: DataTypes.STRING
  });

  Portfolios.associate = function(models){
    Portfolios.hasMany(models.Coins, {
      foreignKey: models.Coins.id
    });
    Portfolios.belongsTo(models.Users);
  };
  return Portfolios;
};