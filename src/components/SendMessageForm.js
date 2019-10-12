import React, { useState } from "react";
import {
  Input,
  Button,
  IconButton,
  FormControl,
  CssBaseline
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  sendMessageForm: {
    flexDirection: "row",
    input: {
      color: "#fff"
    }
  },
  sendMessageInput: {
    flexGrow: 1,
    width: "auto",
    width: "100vw",
    color: "#fff"
  },
  sendMessageButton: {
    flexGrow: 0,
    color: "#fff"
  }
}));

const SendMessageForm = ({ disabled, sendMessage }) => {
  const [message, setMessage] = useState("");
  const classes = useStyles();

  const changeMessageText = e => setMessage(e.target.value);

  const submitMessage = e => {
    e.preventDefault();
    if (message === "") {
      console.log("implement alert cant send empty message");
      return;
    }
    sendMessage(message);
    setMessage("");
  };

  return (
    <FormControl className={classes.sendMessageForm} onSubmit={submitMessage}>
      <CssBaseline />
      <Input
        className={classes.sendMessageInput}
        onChange={changeMessageText}
        placeholder="Send message"
        required
        type="text"
        value={message}
      />
      <IconButton
        className={classes.sendMessageButton}
        type="submit"
        edge="end"
      >
        <SendIcon />
      </IconButton>
    </FormControl>
  );
};

export default SendMessageForm;
