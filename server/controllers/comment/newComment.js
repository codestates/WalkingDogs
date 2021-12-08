const { comment } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = async (req, res) => {
  const userInfo = await isAuthorized(req);
  if(userInfo.accessToken) {
    res.status(400).json({ message: 'you should renew your access token' });
  }
  
  const { room_id, message } = req.body;
  if (!room_id || !message) {
    res.status(400).json({ message: 'you should enter room_id and message' });
  }
  if (!userInfo) {
    res.status(401).json({ message: 'unauthorized' });
  } else {
    try {
      await comment.create({
        room_id: room_id,
        user_id: userInfo.id,
        message: message,
      });

      res
        .status(201)
        .json({ message: 'your comment is created' });
    } catch {
      console.error;
      res.status(500).json({ message: 'server error' });
    }
  }
};
