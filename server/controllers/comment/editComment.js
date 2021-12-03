const { comment } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = async (req, res) => {
  const userInfo = await isAuthorized(req);
  //   const { room_id } = req.query;
  const { comment_id, message } = req.body;

  if (!userInfo) {
    res.status(401).json({ message: 'unauthorized' });
  } else {
    const count = await comment.update(
      {
        message: message,
      },
      {
        where: {
          id: comment_id,
          user_id: userInfo.id
        }
      },
    );
    console.log(count);
    res.status(200).json({ message: 'updated' });
  }
};
