import React, { useEffect, useState } from "react";
import { user } from "../join/Join";
import socketIo from "socket.io-client";
import "./Chat.css";
import sendImage from "../../images/send.png";
import closeIcon from "../../images/closeIcon.png"
import Message from "../message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom"

let socket;
const ENDPOINT = "https://chat-app-jwqe.onrender.com/";

const Chat = () => {
  const [id, setid] = useState("");
  const [messages, setMessages] = useState([])

 const send = () => {
   const message = document.getElementById("chatInput").value;
   socket.emit("message", { message, id });
   document.getElementById("chatInput").value = "";
 };



  useEffect(() => {
    socket = socketIo(ENDPOINT, { transports: ["websocket"] });

    socket.on("connect", () => {
      alert("connected");
      setid(socket.id);
    });

    // emit means -> send data to the backend
    socket.emit("joined", { user });

    socket.on("welcome", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });

    socket.on("userJoined", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });

    socket.on("leave", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });

    return () => {
      socket.on("disconnect");
      socket.off();
    };
  }, []);


useEffect(() => {
  socket.on("sendMessage", (data) => {
    setMessages([...messages, data]);
    console.log(data.user, data.message, data.id);
  });
  return () => {
    socket.off();
  };
}, [messages]);
  

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
          <h2>ChatApp</h2>
          <a href="/">
            <img src={closeIcon} alt="Close" />
          </a>
        </div>
        <ReactScrollToBottom className="chatBox">
          {messages.map((item) => (
            <Message
              user={item.id === id ? "" : item.user}
              message={item.message}
              classs={item.id === id ? "right" : "left"}
            />
          ))}
        </ReactScrollToBottom>
        <div className="inputBox">
          <input type="text" id="chatInput" onKeyUp={(e)=> e.key === "Enter" ? send():null} />
          <button className="sendBtn" onClick={send}>
            <img src={sendImage} alt="sendImg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
