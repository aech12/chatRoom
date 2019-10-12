import React, { Component } from "react";
// import {  } from "@pusher/chatkit-client-react";
import { ChatManager, TokenProvider } from "@pusher/chatkit-client";
// import "./App.css";
import {
  subscribeToRoomAPI,
  getRoomsAPI,
  addRoomAPI,
  sendMessageAPI
} from "../apiCalls/apiCalls";
import AppDrawer from "./AppDrawer";
import { instanceLocator, testTokenProvider, userId } from "../config.js";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      // contrastText: "#000",
      main: "#ef2344",
      light: "#ef2344",
      dark: "#903745" // main: "#d04f65 "
    },
    background: {
      default: "#e5e6e5",
      main: "#e5e6e5",
      light: "#e5e6e5"
    }
  }
});

// componentDidMount() {
//   if (matchMedia("(prefers-color-scheme: dark)").matches) {
//     this.setState({ darkMode: true });
//   }
// }

class App extends Component {
  constructor() {
    super();
    this.state = {
      roomId: null,
      messages: [],
      joinableRooms: [],
      joinedRooms: [],
      localDb: [{ text: "asd", senderId: 12 }]
    };
  }
  componentDidMount() {
    if (matchMedia("(prefers-color-scheme: dark)").matches) {
      theme.palette.type = "dark";
    }
    console.log(theme);

    const chatManager = new ChatManager({
      instanceLocator,
      userId,
      tokenProvider: new TokenProvider({
        url: testTokenProvider
      })
    });

    chatManager
      .connect()
      .then(currentUser => {
        this.currentUser = currentUser;
        this.getRooms();
        // this.addRoom();
        //prettier-ignore
        // this.subscribeToRoom('c1cad9df-2316-48e0-8717-d073da7bb7e8');
      })
      // .then(currentUser => {
      //   console.log("user", currentUser);
      // })
      .catch(error => {
        console.error(`ERROR connecting to Chatkit! ${error}`);
      });
  }

  subscribeToRoom = async roomId => {
    this.setState({ messages: [] });
    // const { messages } = await subscribeToRoomAPI(roomId, this.currentUser);
    // await Promise.all([messages]).then(messages => {
    //   console.log("IM", messages[0]);
    //   this.setState({
    //     messages: [...messages]
    //     // roomId: id
    //   });
    // });
    this.currentUser.subscribeToRoomMultipart({
      roomId,
      hooks: {
        onMessage: message => {
          console.log(roomId);
          this.setState({
            messages: [
              ...this.state.messages,
              {
                text: message.parts[0].payload.content,
                senderId: message.senderId
              }
            ],
            roomId
          });
        }
      }
    });
  };

  getRooms = async () => {
    const joinableRooms = await getRoomsAPI(this.currentUser);
    this.setState({ joinableRooms, joinedRooms: this.currentUser.rooms });
  };

  addRoom = roomName => {
    if (roomName === "" || roomName.length < 3) {
      console.log("Please, enter a longer room name.");
      return;
    }
    const room = addRoomAPI(roomName, this.currentUser);
    room
      .then(room => {
        this.setState({
          joinedRooms: [
            ...this.currentUser.room,
            { name: room.name, id: room.id }
          ]
        });
      })
      .catch(e => console.error("render error msj", e));
  };

  sendMessage = message => {
    const newMessage = sendMessageAPI(
      message,
      this.currentUser,
      this.state.roomId
    );
    this.setState({ messages: [...this.state.messages, newMessage] });
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <AppDrawer
          addRoom={this.addRoom}
          roomId={this.state.roomId}
          subscribeToRoom={this.subscribeToRoom}
          rooms={[...this.state.joinedRooms, ...this.state.joinableRooms]}
          messages={this.state.messages}
          sendMessage={this.sendMessage}
          disable={!this.state.roomId}
        />
      </ThemeProvider>
    );
  }
}

export default App;
