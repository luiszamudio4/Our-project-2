$(document).ready(function(){
  var $user = $("#username");
  var $password = $("#password");
  var $login = $("#submit");
  var user;

  function goToDashboard(id){
    $.get("/api/users" + id, function(){
      window.location.href = "/dashboard";
    });
  }

  function logUser(user){
    $.ajax({
      method: "POST",
      url: "/api/login",
      data: user
    }).then(function(data){
      console.log(data);
      goToDashboard(data.id);
    }).catch(function(err){
      console.log(err);
    });
  }


  function handleLog(event){
    event.preventDefault();
    user = {
      username: $user.val().trim(),
      password: $password.val().trim()
    };

    logUser(user);
  
  }

  $login.on("click", handleLog);
});