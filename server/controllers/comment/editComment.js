const { comment } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = async (req, res) => {
  console.log('editCommentsAPI')
  try {
    const userInfo = await isAuthorized(req);

    if (userInfo.accessToken) {
      res.status(401).json({ message: 'you should renew your access token' });
    }

    const { comment_id, message } = req.body;

    if (!comment_id || !message) {
      return res
        .status(400)
        .json({ message: 'you should enter comment_id and message' });
    }

    if (!userInfo) {
      return res.status(401).json({ message: 'unauthorized' });
    } else {
      const count = await comment.update(
        {
          message: message,
        },
        {
          where: {
            id: comment_id,
            user_id: userInfo.id,
          },
        },
      );
      // console.log(count);
      if (count[0] === 0) {
        return res.status(400).json({ message: 'no change' });
      }
      return res.status(200).json({ message: 'your comment is updated' });
    }
  } catch {
    console.error;
    return res.status(500).json({ message: 'server error' });
  }
};
