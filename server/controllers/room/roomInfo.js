const { room } = require('../../models');
const { user } = require('../../models');
const { user_room } = require('../../models');
const { room_dog } = require('../../models');
const { dog } = require('../../models');
const { room_join_req } = require('../../models');
const { room_join_req_dog } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = async (req, res) => {  
  console.log('roomInfoAPI')
  try {
    const roomId = req.params.room_id;
    const userInfo = await isAuthorized(req);

    if (userInfo.accessToken) {
      return res
        .status(401)
        .json({ message: 'you should renew your access token' });
    }

    if (!userInfo) {
      return res.status(401).json({ message: 'unauthorized' });
    }

    const selRoom = await room.findOne({
      where: {
        id: roomId,
      },
      include: user,
    });
    // .then(result => {
    //   console.log(result);
    // })
    // .catch(err => {
    //   console.log(err);
    // });

    if (!selRoom) {
      return res.status(400).json({ message: 'bad request1' });
    }

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
    })
    // .then(result => {
    //   console.log(result);
    // })
    // .catch(err => {
    //   console.log(err);
    // });  

    if (!roomDog) {
      return res.status(400).json({ message: 'bad request2' });
    }

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
    });

    if (!userRoom) {
      return res.status(400).json({ message: 'bad request3' });
    }

    const dogList = [];
    const userList = [];

    roomDog.room_dogs.forEach(el => {
      dogList.push(el.dataValues.dog);
    });

    userRoom.user_rooms.forEach(el => {
      delete el.dataValues.user.dataValues.password;
      userList.push(el.dataValues.user);
    });

    let isJoined = false;

    userList.forEach(el => {
      if (el.dataValues.id === userInfo.id) isJoined = true;
    });

    const isJoinRequested = await room_join_req
      .findOne({
        where: {
          user_id: userInfo.id,
          room_id: roomId,
        },
    })
    
    const reqList = await room_join_req
      .findAll({
        where: {
          room_id: roomId,
        },
        include: {
          model: user,
          attributes: { exclude: ['email', 'password'] },
          include: {
            model: dog,
            include: {
              model: room_join_req_dog,
              where: {
                room_id: roomId, 
              },
            },
          },
        },
      })
    
    const result = {
      // Response
      image: leaderInfo.dataValues.image,
      username: leaderInfo.dataValues.username,
      title: selRoom.dataValues.title,
      dogs: dogList,
      users: userList,
      reqUsers: reqList.map(el => el.dataValues.user),
      address: selRoom.dataValues.address,
      latitude: selRoom.dataValues.latitude,
      longitude: selRoom.dataValues.longitude,
      isJoined,
      isJoinRequested: isJoinRequested ? true : false,
      isLeader: leaderInfo.dataValues.id === userInfo.id ? true : false,
    };
    
    return res.status(200).json({ data: result, message: 'ok' });
  }
  catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'server error' });
  }
};
