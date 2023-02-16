import React, { useEffect } from "react";
import { user } from "../join/Join";
import socketIo from "socket.io-client";
import "./Chat.css";
import sendImage from "../../images/send.png";

const ENDPOINT = "http://localhost:4500/";
let socket;
const Chat = () => {
  socket = socketIo(ENDPOINT, { transports: ["websocket"] });

  useEffect(() => {
    socket.on("connect", () => {
      alert("connected");
    });

    // emit means -> send data to the backend
    socket.emit("joined", { user });

  });

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header"></div>
        <div className="chatBox"></div>
        <div className="inputBox">
          <input type="tex" id="chatInput" />
          <button className="sendBtn">
            <img src={sendImage} alt="sendImg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
