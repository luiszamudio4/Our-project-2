module.exports = function(sequelize, DataTypes) {
  var coinType = sequelize.define("coinType", {
    // ------------------ NAME
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // ------------------ PRICE
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  });
  
    
  coinType.associate = function(models) {
    coinType.hasMany(models.coin,
      {foreignKey: models.coinType.id}
    );
  };
  
  return coinType;
};
  