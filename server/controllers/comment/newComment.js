const { comment } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = async (req, res) => {
    const userInfo = await isAuthorized(req);
    const { room_id, message } = req.body;

    if (!userInfo) {
        res.status(401).json({ message: 'unauthorized' });
    } else {
      const contents = await comment.create({
          room_id: room_id,
          user_id: userInfo.id,
          message: message
      })
      console.log(contents);
      res.status(201).json({ data: contents, message: 'created' });
    }
}