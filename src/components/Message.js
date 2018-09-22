import React, { Component } from 'react';
import '../containers/App.css';

class Message extends Component {
  render() {
    return (
      <div className='message'>
        <div className='message.name'>{this.props.username}: </div>
        <div className='message.text'>{this.props.text}</div>
      </div>
    )
  }
}

export default Message
