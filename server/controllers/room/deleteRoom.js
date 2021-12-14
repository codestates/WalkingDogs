const { room } = require('../../models');
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
          if (result.dataValues.leader_id === userInfo.id) {
            await room
              .destroy({
                where: {
                  id: room_id,
                  leader_id: userInfo.id
                }
              })
              .then((data) => {
                console.log(data);
                res.status(200).json({ message: 'success' });
              })
              .catch((err) => {
                console.log(err);
                res.status(400).json({ message: 'fail' });
              });
          } else {
              res.status(400).json({ message: 'you are not the leader of this room' });
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json({ message: 'cannot find this room' });
        });
    }
  } catch {
    console.error;
    res.status(500).json({ message: 'server error' });
  }
};
