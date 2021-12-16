const { room_join_req, room_join_req_dog, dog } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = async (req, res) => {
  console.log('cancelReqAPI')
  try {
    const roomId = Number(req.params.room_id);
    const userInfo = await isAuthorized(req);

    if (userInfo.accessToken) {
      res.status(401).json({ message: 'you should renew your access token' });
    }

    if (!userInfo) {
      return res.status(401).json({ message: 'unauthorized' });
    }

    const reqInfo = await room_join_req.findOne({
      where: {
        user_id: userInfo.id,
        room_id: roomId,
      },
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ message: 'server error' });
    });

    if (reqInfo) {
      await room_join_req.destroy({
        where: {
        user_id: userInfo.id,
        room_id: roomId,
        }
      })

      const myDogs = await dog.findAll({
          where: {
              user_id: userInfo.id,
          },
      })
      
      myDogs.forEach(async (el) => {
        await room_join_req_dog.destroy({
            where: {
            room_id: roomId,
            dog_id: el.dataValues.id
            }
        })
      })

      return res.status(200).json({ message: 'ok' })
    }

    return res.status(400).json({ message: 'you did not sended join request' });
  }
  catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'server error' })
  }
};
