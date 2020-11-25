var express = require("express");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

var numOfUsers = 0;

app.use(express.static(__dirname + "/public"));

io.on("connection", function (socket) {
  socket.on("new user", function (username) {
    socket.username = username;
    ++numOfUsers;
    socket.broadcast.emit("user joined", {
      username: socket.username,
      numOfUsers: numOfUsers,
    });
  });

  socket.on("chat message", function (msg) {
    io.emit("chat message", {
      username: socket.username,
      message: msg,
    });
  });
  socket.on("disconnect", function () {
    --numOfUsers;
    socket.broadcast.emit("user left", {
      username: socket.username,
      numOfUsers: numOfUsers,
    });
  });
});

http.listen(3000, function () {
  console.log("listen *:3000");
});
