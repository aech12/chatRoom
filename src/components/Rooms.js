import React, { Component } from 'react';
import '../containers/App.css';
import './Components.css';
import './ShowRooms.css';

class Rooms extends Component {
  render() {
    //research more this below
    const orderedRooms = [...this.props.rooms].sort((a, b) => a.id - b.id)
    return (
      <div className='roomList center'>
        <ul>
          <h3>Room list</h3>
          {orderedRooms.map(room=> {
            //very cool, easy way to set a class
            const active = this.props.roomId === room.id ? 'active' : ''
            return (
              <div>
                <li className={'room ' + active} key={room.id}>
                  <a 
                    onClick={()=> this.props.subscribeToRoom(room.id)}
                    href='#'># {room.name}
                  </a>
                </li>
              </div>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default Rooms;