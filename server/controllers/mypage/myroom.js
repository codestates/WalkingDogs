const { room, user_room, user } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = async (req, res) => {
  try {
    const userInfo = await isAuthorized(req);

    if (userInfo.accessToken) {
      res.status(401).json({ message: 'you should renew your access token' });
    }

    if (!userInfo) {
      res.status(401).json({ message: 'this token is not authorized' });
    } else {
      const id = userInfo.id;
      const roomList = await user_room.findAll({
        where: {
          user_id: id,
        },
        include: {
          model: room,
          include: {
            model: user,
          },
        },
      });

      if (!roomList) {
        res.status(400).json({ message: 'no such user in the database' });
      } else {        
        const rooms = [];
        roomList.forEach(el => {
          rooms.push(el.room);
        });

        res.status(200).json({ rooms, message: 'ok' });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'server error' });
  }
};
