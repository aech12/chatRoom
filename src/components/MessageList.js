import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Message from './Message';
import '../containers/App.css';

class MessageList extends Component {

  componentWillUpdate() {
    const node = ReactDOM.findDOMNode(this);
    this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 30 >= node.scrollHeight;
  }

  componentDidUpdate() {
    if (this.shouldScrollToBottom) {
      const node = ReactDOM.findDOMNode(this);
      node.scrollTop = node.scrollHeight;
    }
  }

  render() {
    const {messages, roomId} = this.props;
    
    if (!roomId) {
      return (
        <div className="messageList">
            <div className="joinRoom">
                &larr; Join a room!
            </div>
            <div className="joinRoomMobile">
                &uarr; Join a room!
            </div>
        </div>
      )
    }
    return (
      <div className='messageList'>
        {messages.map((message, i)=> {
          return (
            <Message 
              username={message.senderId} 
              text={message.text}
              key={i}
            />
          )
        })}
      </div>
    )
  }
}

export default MessageList
