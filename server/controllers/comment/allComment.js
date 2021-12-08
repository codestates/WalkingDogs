const { comment, user } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = async (req, res) => {
  const userInfo = await isAuthorized(req);
  const { room_id } = req.query;
  if(userInfo.accessToken) {
    res.status(400).json({ message: 'you should renew your access token' });
  }
  
  if (!room_id) {
    res.status(400).json({ message: 'you should enter room_id' });
  }
  if (!userInfo) {
    res.status(401).json({ message: 'unauthorized' });
  } else {
    try {
      const contents = await comment.findAll({
        order: [ ['createdAt', 'ASC']],
        where: {
          room_id: room_id,
        },
        include: user,
      });
      console.log(contents);

      res.status(200).json({ data: contents, message: 'ok' });
    } catch {
      console.error;
      res.status(500).json({ message: 'server error' });
    }
  }
};
