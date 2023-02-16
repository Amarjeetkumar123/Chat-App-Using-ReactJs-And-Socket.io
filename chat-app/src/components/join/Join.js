import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Join.css"
import logo from "../../images/logo.png"

let user;
const Join = () => {

  const sendUser = () => {
    user = document.getElementById("joinInput").value;
    document.getElementById("joinInput").value = "";
}

  const [name, setName] = useState("");

  return (
    <div className="JoinPage">
      <div className="JoinContainer">
        <img src={logo} alt="logo" />
        <h1>ChatApp</h1>
        <input type="text" placeholder="Enter Your Name" id="joinInput" onChange={(e)=>setName(e.target.value)} />
        <Link to="/chat" onClick={(e)=> !name ? e.preventDefault():null}>
          <button onClick={sendUser} className="joinbtn">Log In</button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
export { user };
