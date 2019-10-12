import React, { useEffect } from "react";
import "../../containers/App.css";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  message: props => ({
    display: "flex",
    flexDirection: "row",
    background: props.bgColor
  })
}));

const Message = ({ username, text, bgColor }) => {
  const classes = useStyles({ bgColor });

  return (
    <div className={classes.message}>
      <p className="messageName">{username}: </p>
      <p className="messageText">{text}</p>
    </div>
  );
};

export default Message;
