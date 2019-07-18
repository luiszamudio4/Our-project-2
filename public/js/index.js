// Get references to page elements
var $email = $("#newEmail");
var $username = $("#newUser");
var $password = $("#newPwd");
var $submitBtn = $("#register");
var $userList = $("#userlist");

// The API object contains methods for each kind of request we'll make
var API = {
  saveUser: function(user) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/register",
      data: JSON.stringify(user)
    }).then(function(req, res){
      res.redirect("/");
    });
  },
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

// refreshExamples gets new examples from the db and repopulates the list
var refreshUsers = function() {
  API.getUser().then(function(data) {
    var $user = data.map(function(user) {
      var $a = $("<a>")
        .text(user.username)
        .attr("href", "/users/" + user.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": user.id
        })
        .append($a);

      // var $button = $("<button>")
      //   .addClass("btn btn-danger float-right delete")
      //   .text("ｘ");

      // $li.append($button);

      return $li;
    });

    $userList.empty();
    $userList.append($user);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var user = {
    email: $email.val().trim(),
    name: $username.val().trim(),
    password: $password.val().trim()
  };

  if (!(user.email && user.name && user.password)) {
    alert("You must enter valid info!");
    return;
  }

  API.saveUser(user).then(function(req, res){
    refreshUsers();
    res.redirect("/");
  });

  $email.val("");
  $username.val("");
  $password.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$userList.on("click", ".delete", handleDeleteBtnClick);
