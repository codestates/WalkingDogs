const { comment } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = async (req, res) => {
  const userInfo = await isAuthorized(req);
  const { comment_id } = req.body;

  if (!userInfo) {
      res.status(401).json({ message: 'unauthorized' });
  } else {
      const result = await comment.destroy({
        where: {
            id: comment_id,
            user_id: userInfo.id
        }
      })
      console.log(result);
      res.status(200).json({ message: 'deleted' });
  }
}