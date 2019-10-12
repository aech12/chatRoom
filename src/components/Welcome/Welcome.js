import React from "react";
import "../../containers/App.css";

const Message = ({ username, text }) => {
  return (
    <div className="message">
      <p className="messageName">{username}: </p>
      <p className="messageText">{text}</p>
    </div>
  );
};

export default Message;
