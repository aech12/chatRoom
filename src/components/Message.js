import React, { Component } from 'react';
import '../containers/App.css';

class Message extends Component {
  render() {
    return (
      <div className='message'>
        <div className='messageName'>{this.props.username}: </div>
        <div className='messageText'>{this.props.text}</div>
      </div>
    )
  }
}

export default Message
