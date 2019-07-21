// Get references to page elements
var $email = $("#newEmail");
var $username = $("#newUser");
var $password = $("#newPwd");
var $submitBtn = $("#register");

// The API object contains methods for each kind of request we'll make
var API = {
  getUser: function() {
    return $.ajax({
      url: "/api/users",
      type: "GET"
    });
  },
  deleteUser: function(id) {
    return $.ajax({
      url: "/api/users/" + id,
      type: "DELETE"
    });
  }
};

var saveUser = function(user) {
  return $.ajax({
    headers: {
      "Content-Type": "application/json"
    },
    type: "POST",
    url: "/api/register",
    data: JSON.stringify(user)
  });
};


// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var user = {
    email: $email.val().trim(),
    username: $username.val().trim(),
    password: $password.val().trim()
  };

  console.log(user);


  if (!user) {
    alert("You must enter valid info!");
    return;
  }
  console.log(saveUser(user));
  console.log("GET USER: " + API.getUser());
  saveUser(user).then(function(){
    API.getUser(user);
  });

  $email.val("");
  $username.val("");
  $password.val("");
};


// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
