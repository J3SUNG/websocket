$(function () {
  var socket = io();

  var $messages = $(".messages");
  var $inputMessage = $(".inputMessage");

  socket.emit("new user", {});

  function addMessageElement(el) {
    $messages.append(el);
  }

  $("form").submit(function () {
    socket.emit("chat message", $inputMessage.val());
    $inputMessage.val("");
    return false;
  });

  socket.on("chat message", function (msg) {
    var $message = $("<li class='message'/>").text(msg);
    addMessageElement($message);
  });

  socket.on("user joined", function (numOfUsers) {
    var $joinLog = $("<li class='log'/>").text(
      "손님 등장! (" + numOfUsers + ")"
    );
    addMessageElement($joinLog);
  });

  socket.on("user left", function (numOfUsers) {
    var $leftLog = $("<li class='log'/>").text(
      "손님 퇴장! (" + numOfUsers + ")"
    );
    addMessageElement($leftLog);
  });
});
