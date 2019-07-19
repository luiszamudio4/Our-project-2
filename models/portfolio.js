module.exports = function(sequelize, DataTypes){
  var portfolio = sequelize.define("portfolio", {
    name: DataTypes.STRING,
    usdBalance: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 30000.00
    }
  });

  portfolio.associate = function(models){
    portfolio.hasMany(models.coin, {
      foreignKey: models.coin.id
    });
    portfolio.belongsTo(models.user);
  };
  return portfolio;
};