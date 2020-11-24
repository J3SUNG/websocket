var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", function (socket) {
  console.log("손님 입장");
  socket.on("chat message", function (msg) {
    io.emit("chat message", msg);
    // socket.broadcast.emit("chat message", msg);
  });
  socket.on("disconnect", function () {
    console.log("들어올 땐 맘대로지만 나갈땐 아니란다.");
  });
});

http.listen(3000, function () {
  console.log("listen *:3000");
});
