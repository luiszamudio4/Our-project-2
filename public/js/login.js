var $user = $("#username");
var $password = $("#password");
var $login = $("submit");

var API = {
  logUser: function(user){
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/login",
      data: user
    });
  }
};

var handleLog = function(event){
  event.preventDefault();
  var user = {
    username: $user.val().trim(),
    password: $password.val().trim()
  };
  if (!(user.name && user.password)) {
    alert("You must enter valid info!");
    return;
  }
  API.logUser(user);
};

$login.on("click", handleLog);