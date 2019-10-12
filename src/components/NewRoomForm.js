import React, { useState } from "react";
import { Input, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles(theme => ({
  newRoomForm: {
    flexDirection: "row"
    // width: "100vw"
  },
  newRoomInput: {
    width: "70%",
    marginLeft: "5px"
  },
  newRoomButton: {
    padding: 0
  }
}));
const NewRoomForm = ({ addRoom }) => {
  const [roomName, setRoomName] = useState("");
  const classes = useStyles();

  const handleChange = e => setRoomName(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    addRoom(roomName);
    setRoomName("");
  };

  return (
    <form className={classes.newRoomForm} onSubmit={handleSubmit}>
      <Input
        className={classes.newRoomInput}
        onChange={handleChange}
        placeholder="New Room"
        required
        type="text"
        value={roomName}
      />
      <Button
        className={classes.newRoomButton}
        type="submit"
        id="create-room-button"
      >
        <AddIcon />
      </Button>
    </form>
  );
};

export default NewRoomForm;
