const { room, user_room, room_dog, dog } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = async (req, res) => {
  console.log('deleteRoomAPI');
  try {
    const userInfo = await isAuthorized(req);

    if (userInfo.accessToken) {
      res.status(401).json({ message: 'you should renew your access token' });
    }

    const { room_id } = req.params;

    if (!room_id) {
      res.status(400).json({ message: 'you should enter room_id' });
    }

    if (!userInfo) {
      res.status(401).json({ message: 'unauthorized' });
    } else {
      await room
        .findOne({
          where: {
            id: room_id
          }
        })
        .then(async (result) => {
          console.log(result);

          if (result.dataValues.leader_id === userInfo.id) { // 요청을 넣은 유저가 leader라면 방을 삭제함.
            await room
              .destroy({
                where: {
                  id: room_id,
                  leader_id: userInfo.id
                }
              })
              .then((data) => {
                console.log(data);
                return res.status(200).json({ message: 'success' });
              })
              .catch((err) => {
                console.log(err);
                return res.status(400).json({ message: 'fail' });
              });
          }
          else { // 요청을 넣은 유저가 leader가 아니면 방을 떠남.
            await user_room
              .destroy({
                where: {
                  room_id,
                  user_id: userInfo.id,
                }
              })
              .then((data) => {
                console.log(data);
                return res.status(200).json({ message: 'success' });
              })
              .catch((err) => {
                console.log(err);
                return res.status(400).json({ message: 'fail' });
              });
            
            const dogList = await dog.findAll({
              where: {
                user_id: userInfo.id,
              },
            })

            dogList.forEach(async (el) => {
              await room_dog
              .destroy({
                where: {
                  room_id,
                  dog_id: el.id,
                }
              })
              .catch((err) => {
                console.log(err);
                return res.status(400).json({ message: 'fail' });
              })
            })
          }
        })
        .catch((err) => {
          console.log(err);
          return res.status(400).json({ message: 'cannot find this room' });
        });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'server error' });
  }
};
