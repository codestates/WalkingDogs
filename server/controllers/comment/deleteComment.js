const { comment } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = async (req, res) => {
  const userInfo = await isAuthorized(req);
  const { comment_id } = req.body;
  if (!comment_id) {
    res.status(400).json({ message: 'you should enter comment_id' });
  }
  if (!userInfo) {
      res.status(401).json({ message: 'unauthorized' });
  } else {
    try {
      const result = await comment.destroy({
        where: {
            id: comment_id,
            user_id: userInfo.id
        }
      })
      console.log(result);
      if (!result) {
        res.status(400).json({ message: 'this comment is not written by the user' });
      }
      res.status(200).json({ message: 'your comment is deleted' });
    } catch {
      console.error;
      res.status(500).json({ message: 'server error'});
    }
      
  }
}