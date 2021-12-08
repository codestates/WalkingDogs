const { room } = require('../../models');
const { user } = require('../../models');
const { user_room } = require('../../models');
const { room_dog } = require('../../models');
const { dog } = require('../../models');
const { room_join_req } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = async (req, res) => {
  const roomId = req.params.room_id;
  const userInfo = await isAuthorized(req);

  if (!userInfo) {
    return res.status(401).json({ message: 'unauthorized' });
  }

  const selRoom = await room.findOne({
  where: {
      id: roomId,
    },
    include: user,
  });

  const leaderInfo = selRoom.dataValues.user;

  const roomDog = await room.findOne({
    where: {
      id: roomId,
    },
    include: {
      model: room_dog,
      include: {
        model: dog,
      },
    },
  });

  const userRoom = await room.findOne({
    where: {
      id: roomId,
    },
    include: {
      model: user_room,
      include: {
        model: user,
      },
    },
  })

  const dogList = [];
  const userList = [];

  roomDog.room_dogs.forEach(el => {
    dogList.push(el.dataValues.dog);
  });

  userRoom.user_rooms.forEach(el => {
    userList.push(el.dataValues.user);
  })

  let isJoined = false
  let isJoinRequested = false

  userList.forEach((el) => {
    if(el.dataValues.id === userInfo.id)
      isJoined = true
  })

  const reqList = await room_join_req.findOne({
    where: {
      user_id: userInfo.id,
      room_id: roomId,
    }
  })

  isJoinRequested = reqList ? true : false;

  const result = {
    // Response
    image: leaderInfo.dataValues.image,
    username: leaderInfo.dataValues.username,
    title: selRoom.dataValues.title,
    dogs: dogList,
    users: userList,
    address: selRoom.dataValues.address,
    latitude: selRoom.dataValues.latitude,
    longitude: selRoom.dataValues.longitude,
    isJoined,
    isJoinRequested,
  };

  console.log(result)

  return res.status(200).json({ data: result, message: 'ok' });
};
