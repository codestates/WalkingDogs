const { room } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = async (req, res) => {
  const userInfo = await isAuthorized(req);

  if (!userInfo) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // req.body => 선택한 room_id가 body로 와야함.
};
