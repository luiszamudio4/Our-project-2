$(document).ready(function(){
  // Get references to page elements
  var $email = $("#newEmail");
  var $username = $("#newUser");
  var $password = $("#newPwd");
  var $submitBtn = $("#register");
  var user;

  function submitUser(user){
    $.post("/api/register", user, function(data){
      console.log(data);
    });
  }

  function getUser(id){
    $.get("/api/users/" + id, function(data){
      console.log(data);
      window.location.href = "/dashboard";
    });
  }

  function handleFormSubmit(event){
    event.preventDefault();

    user = {
      email: $email.val().trim(),
      username: $username.val().trim(),
      password: $password.val().trim()
    };

    if (!user.email || !user.username || !user.password) {
      return;
    }
    submitUser(user);
    getUser(user.id);
  }

  $submitBtn.on("click", handleFormSubmit);
});