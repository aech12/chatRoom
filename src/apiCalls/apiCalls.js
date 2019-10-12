const subscribeToRoomAPI = async (roomId, currentUser) => {
  // try {
  let messages = [];
  currentUser.subscribeToRoomMultipart({
    roomId,
    hooks: {
      onMessage: message => {
        const a = new Promise((res, rej) => {
          console.log("received message", message);
          res(
            message
            // messages.push({
            //   text: message.parts[0].payload.content,
            //   senderId: message.senderId
            // })
          );
        });
        messages.push(a);
      }
    },
    messageLimit: 100
  });
  // console.log("a", messages);
  await Promise.all(messages).then(all => console.log("api", messages));

  // const id = roomWithMessages.id

  return { messages: [...messages] };
  // } catch (e) {
  //   console.error("Error getting messages: ", e);
  // }
};
const getRoomsAPI = async currentUser => {
  const rooms = await currentUser
    .getJoinableRooms()
    .then(joinableRooms => joinableRooms)
    .catch(err => {
      console.log(`Error getting joinable rooms: ${err}`);
    });
  return rooms;
};

const addRoomAPI = async (roomName, currentUser) => {
  const newRoom = await currentUser
    .createRoom({
      name: roomName,
      private: false,
      addUserIds: [currentUser.id]
    })
    // .then(room => {
    //   console.log(`Created room called ${room.name}`);
    // })
    // .then(room => Promise.reject("e test"))
    .then(room => room)
    .catch(err => {
      console.log(`Error creating room ${err}`);
    });
  return newRoom;
};

const sendMessageAPI = async (text, currentUser, roomId) => {
  // return
  //   .then(messageId => {
  //     console.log(`Added message to ${myRoom.name}`);
  //   })
  //   .catch(err => {
  //     console.log(`Error adding message to ${myRoom.name}: ${err}`);
  //   });
  try {
    await currentUser.sendSimpleMessage({
      roomId,
      text
    });
    return { text, senderId: currentUser.id };
  } catch (err) {
    console.log(`Error adding message: ${err}`);
  }
};

export { subscribeToRoomAPI, getRoomsAPI, addRoomAPI, sendMessageAPI };
