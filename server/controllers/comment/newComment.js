const { comment } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = async (req, res) => {
  const userInfo = await isAuthorized(req);
  const { room_id, message } = req.body;
  if (!room_id || !message) {
    res.status(400).json({ message: 'you should enter room_id and message' });
  }
  if (!userInfo) {
    res.status(401).json({ message: 'unauthorized' });
  } else {
    try {
      const contents = await comment.create({
        room_id: room_id,
        user_id: userInfo.id,
        message: message,
      });
      console.log(contents);
      res
        .status(201)
        .json({ data: contents, message: 'your comment is created' });
    } catch {
      console.error;
      res.status(500).json({ message: 'server error' });
    }
  }
};
