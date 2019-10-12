import React, { Component } from "react";
import MessageList from "../components/MessageList";
import SendMessageForm from "../components/SendMessageForm";
import Rooms from "../components/Rooms";
import NewRoomForm from "../components/NewRoomForm";
import clsx from "clsx";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  Divider,
  IconButton,
  BottomNavigation
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuIcon from "@material-ui/icons/Menu";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: drawerWidth
  },
  hide: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    background: {
      default: "#a0a0a0"
    },
    background: "#a8a8a8"
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-start"
  },
  messageBar: {
    top: "auto",
    bottom: "0%",
    input: {
      color: "#fff"
    }
  }
}));

const PersistentDrawerRight = ({
  addRoom,
  roomId,
  subscribeToRoom,
  rooms,
  messages,
  sendMessage,
  disable
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <Typography variant="h6" noWrap className={classes.title}>
            Persistent drawer
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <main>
        <MessageList messages={messages} roomId={roomId} />

        <AppBar
          position="fixed"
          className={clsx(classes.messageBar, {
            [classes.appBarShift]: open
          })}
        >
          Hi
        </AppBar>
        <AppBar
          position="fixed"
          className={clsx(classes.messageBar, {
            [classes.appBarShift]: open
          })}
        >
          {/*<Toolbar/>*/}
          <SendMessageForm sendMessage={sendMessage} disable={!roomId} />
        </AppBar>
      </main>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronRightIcon />
          </IconButton>
        </div>
        <Divider />

        <NewRoomForm addRoom={addRoom} />
        <Rooms
          roomId={roomId}
          subscribeToRoom={subscribeToRoom}
          rooms={rooms}
        />
      </Drawer>
    </div>
  );
};

export default PersistentDrawerRight;
