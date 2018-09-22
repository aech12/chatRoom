import React, { Component } from 'react';
import '../containers/App.css';

class NewRoomForm extends Component {

  constructor() {
    super();
    this.state = {
      roomName: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({
      roomName: e.target.value
    })
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.addRoom(this.state.roomName);
    this.setState({
      roomName: ''
    })
  }

  render() {
    return (
      <div className='newRoomForm'>
        <form onSubmit={this.handleSubmit}>
          <input
            value={this.state.roomName}
            onChange={this.handleChange}
            type='text'
            placeholder='New Room'
            required
          />
          <button 
            type='submit'
            id='create-room-button'> + 
          </button>
        </form>
      </div>
    )
  }
}

export default NewRoomForm;
