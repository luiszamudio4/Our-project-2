
// ------------------ SEQUELIZE - DB COIN TABLES
module.exports = function(sequelize, DataTypes) {
  var coin = sequelize.define("coin", {
    // ------------------ NAME
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // ------------------ PRICE
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    // ------------------ COIN RANK
    coinRank: DataTypes.INTEGER    
  });

  
  coin.associate = function(models) {
    coin.belongsTo(models.User);
  };

  return coin;
};
