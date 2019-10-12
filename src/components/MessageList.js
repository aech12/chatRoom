import React, { useEffect, useRef } from "react";
import Message from "./Message/Message";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

const useStyles = makeStyles(theme => ({
  messageList: {
    flexDirection: "row",
    width: "100vw",
    paddingLeft: "5px",
    paddingRight: "15px"
  },
  joinRoom: {
    // textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100vw",
    height: "100vh"
  },
  joinRoomMobile: {}
}));

const MessageList = ({ messages, roomId }) => {
  const classes = useStyles();
  const refMessageList = useRef(null);
  useEffect(() => {
    // console.log("MS", messages[0]);
    const node = refMessageList.current;
    const shouldScrollToBottom =
      node.scrollTop + node.clientHeight + 30 >= node.scrollHeight;
    if (shouldScrollToBottom) {
      node.scrollTop = node.scrollHeight;
    }
  });

  return (
    <div ref={refMessageList} className={classes.messageList}>
      <Typography>
        {!roomId ? (
          <div className={classes.joinRoom}>
            <ArrowUpwardIcon />
            <p className={classes.joinRoomMobile}>Join a room to chat!</p>
          </div>
        ) : (
          <React.Fragment>
            {messages.map((message, i) => {
              return (
                <Message
                  username={message.senderId}
                  text={message.text}
                  key={i}
                  i={i}
                  bgColor={i % 2 === 0 ? `#e0dede` : ``}
                />
              );
            })}
          </React.Fragment>
        )}
      </Typography>
    </div>
  );
};

export default MessageList;
