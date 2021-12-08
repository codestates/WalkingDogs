const { room } = require('../../models');
const { user } = require('../../models');
const { room_dog } = require('../../models');
const { dog } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = async (req, res) => {
  const roomId = req.params.room_id;
  const userInfo = await isAuthorized(req);
  if(userInfo.accessToken) {
    res.status(400).json({ message: 'you should renew your access token' });
  }
  

  if (!userInfo) {
    return res.status(401).json({ message: 'unauthorized' });
  }

  const roomUser = await room.findOne({
    where: {
      id: roomId,
    },
    include: user,
  });

  const leaderInfo = roomUser.dataValues.user;

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

  const dogList = [];

  roomDog.room_dogs.forEach(el => {
    dogList.push(el.dataValues.dog);
  });

  console.log(dogList);

  const result = {
    // Response
    image: leaderInfo.dataValues.image,
    username: leaderInfo.dataValues.username,
    title: roomUser.dataValues.title,
    dogs: dogList,
    address: roomUser.dataValues.address,
    latitude: roomUser.dataValues.latitude,
    longitude: roomUser.dataValues.longitude,
  };

  return res.status(200).json({ data: result, message: 'ok' });
};
