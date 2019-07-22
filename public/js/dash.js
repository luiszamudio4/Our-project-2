$(document).ready(function(){
  var $buyBtn = $("#buyBtn");
  var $sellBtn = $("#sellBtn");
  var $buyCoin = $("#inputBuyCoin");
  var $buyAmt = $("#inputBuyAmount");
  var $sellCoin = $("#inputSellCoin");
  var $sellAmt = $("#inputSellAmount");
  var coinId;

  function getCoin(coin){
    $.ajax({
      method:"GET",
      url: "/api/coins" + coin
    }).then(function(data){
      console.log(data);
      coinId = data.id;
    }).catch(function(err){
      console.log(err.stack);
    });
  }

  function buyCoin(coinId, amount){
    $.ajax({
      method: "POST",
      url: "/api/coins/buy" + coinId,
      data: amount
    }).then(function(data){
      console.log(data);
    }).catch(function(err){
      console.log(err.stack);
    });
  }

  function sellCoin(coinId, amount){
    $.ajax({
      method: "POST",
      url: "/api/coins/sell" + coinId,
      data: amount
    }).then(function(data){
      console.log(data);
    }).catch(function(err){
      console.log(err.stack);
    });
  }

  function handleBuy(event){
    event.preventDefault();
    var coin = $buyCoin.val();
    var amount = $buyAmt.val();
    console.log(coin);
    console.log(amount);
    getCoin(coin);
    buyCoin(coinId, amount);
  }

  function handleSell(event){
    event.preventDefault();
    var coin = $sellCoin.val();
    var amount = $sellAmt.val();
    console.log(coin);
    console.log(amount);
    getCoin(coin);
    sellCoin(coinId, amount);
  }

  $buyBtn.on("click", handleBuy(event));
  $sellBtn.on("click", handleSell(event));
});