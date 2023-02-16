const express = require("express");
const http = require("http");
const cors = require("cors");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);

const port = process.env.PORT;

app.use(cors);

app.get("/", (req, res) => {
  res.send("<h1>Server Works Properly</h1>");
});

// user array
const users = [{}];

const io = socketio(server);

io.on("connection", (socket) => {
  console.log("a user connected");

  //on means -> data recieve
  socket.on("joined", ({ user }) => {
    users[socket.id] = user;

    console.log(`${user} has joined`);

    socket.broadcast.emit("userJoined", {
      user: "Admin",
      message: `${users[socket.id]} has Joined`,
    });
    socket.emit("welcome", {
      user: "Admin",
      message: `Welcome to the chat ${users[socket.id]}`,
    });

  });

   socket.on("message", ({ message, id }) => {
     io.emit("sendMessage", { user: users[id], message, id });
   });


  socket.on("disconnect", () => {
    socket.broadcast.emit("leave", {
      user: "Admin",
      message: `${users[socket.id]}  has left`,
    });
    console.log("User left");
  });
});

server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
