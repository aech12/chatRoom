import React, { Component } from 'react'
import '../containers/App.css';

export class SendMessageForm extends Component {

  constructor() {
    super()
    this.state = {
      message: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      message: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.sendMessage(this.state.message)
    this.setState({
      message: ''
    })
  }

  render() {
    return (
      <form 
      className="sendMessageForm" 
      onSubmit={this.handleSubmit}>
        <input
          className='sendMessageInput'
          disabled={this.props.disabled}
          onChange={this.handleChange}
          value={this.state.message}
          placeholder="Send message"
          type="text"
        />
        <button 
          // className=''
          type='submit'
          id=''> Send
        </button>
      </form>
    )
  }
}

export default SendMessageForm
