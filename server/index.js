const express = require("express");
const http = require("http");
const cors = require("cors");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 4500;

app.use(cors);

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

const io = socketio(server);

io.on("connection", (socket) => {
  console.log("a user connected");

  //on means -> data recieve
  socket.on("joined", ({ user }) => {
    console.log(`${user} has joined`);
  });
});

server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
