var $user = $("#username");
var $password = $("#password");
var $login = $("submit");

var API = {
  logUser: function(user){
    $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/login",
      data: user
    });
  },
  goToDashboard: function(data){
    console.log(data);
    if(!data){
      window.location.href = "/login";
    }else{
      window.location.href = "/dashboard";
    }
  }
};

var handleLog = function(event){
  event.preventDefault();
  debugger;
  var user = {
    username: $user.val().trim(),
    password: $password.val().trim()
  };
  if (!(user.name && user.password)) {
    alert("You must enter valid info!");
    return;
  }
  API.logUser(user).then(function(data){
    API.goToDashboard(data);
  });
};

$login.on("click", handleLog);