$(function () {
  var COLORS = [
    "#e21400",
    "#91580f",
    "#f8a700",
    "#f78b00",
    "#58dc00",
    "#287b00",
    "#a8f07a",
    "#4ae8c4",
    "#3b88eb",
    "#3824aa",
    "#a700ff",
    "#d300e7",
  ];

  var socket = io();

  var username;

  var $window = $(window);

  var $loginPage = $(".login.page");
  var $chatPage = $(".chat.page");

  var $usernameInput = $(".usernameInput");
  var $messages = $(".messages");
  var $inputMessage = $(".inputMessage");
  var $currentInput = $usernameInput.focus();

  function getUsernameColor(username) {
    var index = 0;

    for (var i = 0; i < username.length; ++i) {
      index += username.charCodeAt(i);
    }
    index = Math.abs(index % COLORS.length);
    return COLORS[index];
  }

  function addMessageElement(el) {
    $messages.append(el);
  }

  $window.keydown(function (event) {
    if (event.which === 13) {
      if (username) {
        socket.emit("chat message", $inputMessage.val());
        $inputMessage.val("");
      } else {
        username = $usernameInput.val();
        if (username) {
          $currentInput = $inputMessage.focus();
          $loginPage.fadeOut();
          $chatPage.show();
          socket.emit("new user", username);
        }
      }
    }
  });

  socket.on("chat message", function (data) {
    var $usernameSpan = $('<span class="username"/>')
      .css("color", getUsernameColor(data.username))
      .text(data.username);
    var $messageBodySpan = $('<span class="messageBody"/>').text(data.message);
    var $message = $("<li class='message'/>").append(
      $usernameSpan,
      $messageBodySpan
    );
    addMessageElement($message);
  });

  socket.on("user joined", function (data) {
    var $joinLog = $("<li class='log'/>").text(
      data.username + "손님 등장! (" + data.numOfUsers + ")"
    );
    addMessageElement($joinLog);
  });

  socket.on("user left", function (data) {
    var $leftLog = $("<li class='log'/>").text(
      data.username + "손님 퇴장! (" + data.numOfUsers + ")"
    );
    addMessageElement($leftLog);
  });
});
