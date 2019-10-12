import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  roomList: {
    paddingLeft: "5px"
  },
  ul: {
    listStyleType: "none"
  }
}));

const Rooms = ({ rooms, roomId, subscribeToRoom }) => {
  const classes = useStyles();

  const orderedRooms = [...rooms].sort((a, b) => a.id - b.id);
  return (
    <Typography className={classes.roomList}>
      <h3>Rooms</h3>
      <ul className={classes.ul}>
        {orderedRooms.map(room => {
          const active = roomId === room.id ? "active" : "";
          return (
            <div key={room.id}>
              <li className={"room " + active} key={room.id}>
                <a onClick={() => subscribeToRoom(room.id)}># {room.name}</a>
              </li>
            </div>
          );
        })}
      </ul>
    </Typography>
  );
};

export default Rooms;
