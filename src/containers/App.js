import React, { Component } from 'react';
import Chatkit, { ChatManager, TokenProvider } from '@pusher/chatkit';
import './App.css';
import MessageList from '../components/MessageList';
import SendMessageForm from '../components/SendMessageForm';
import Rooms from '../components/Rooms';
import NewRoomForm from '../components/NewRoomForm';

import { instanceLocator, testTokenProvider } from '../config.js';

class App extends Component {
  constructor() {
    super()
    this.state = {
      roomId: null,
      messages: [],
      joinableRooms: [],
      joinedRooms: []
    }
  }

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: instanceLocator,
      userId: "aech12",
      tokenProvider: new Chatkit.TokenProvider({
        url: testTokenProvider
      })
    });

    chatManager.connect()
      .then(currentUser => {
        
        this.currentUser = currentUser;
        this.getRooms();
        this.addRoom();
        this.subscribeToRoom();

      })
      .catch(error => {
        console.error("error connecting user:", error);
      });
  }

  subscribeToRoom = (roomId) => {
    this.setState({
      messages: []
    })
    this.currentUser.subscribeToRoom({
      roomId,
      hooks: {
        onNewMessage: message => {
          this.setState({
            messages: [...this.state.messages, message]
          })
        }
      }
    }).then(room => {
        this.getRooms(this.setState({
          roomId: room.id
        }))
      })
      .catch(err => console.log('error on subscribing to room: ', err))
  }
  
  getRooms = () => {
    this.currentUser.getJoinableRooms()
      .then(joinableRooms => {
        this.setState({
          joinableRooms,
          joinedRooms: this.currentUser.rooms
        })
      })
      .catch(err => {
        console.log(`Error getting joinable rooms: ${err}`)
      })
  }

  addRoom = (roomName) => {
    this.currentUser.createRoom({
      name: roomName,
    }).then(room => {
      this.subscribeToRoom(room.id)
    })
    .catch(err => {
      console.log(`Error creating room ${err}`)
    })
  }

  sendMessage = (text) => {
    this.currentUser.sendMessage({
      text,
      roomId: this.state.roomId
    })
      .then(messageId => {
        console.log(`Added message to 16444701`)
      })
      .catch(err => {
        console.log(`Error adding message to 16444701: ${err}`)
      })
  }

  render() {
    return (
      <div className="App">
        <Rooms 
          roomId={this.state.roomId}
          subscribeToRoom={this.subscribeToRoom}
          rooms={[
            ...this.state.joinableRooms,
            ...this.state.joinedRooms
        ]}/>
        <MessageList 
          messages={this.state.messages} 
          roomId={this.state.roomId}
        />
        <SendMessageForm 
          sendMessage={this.sendMessage}
          disable={!this.state.roomId}
        />
        <NewRoomForm addRoom={this.addRoom}/>
      </div>
    );
  }
}

export default App;
