const { user, dog } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = async (req, res) => {
  console.log('dogListAPI')
  try {
    const userInfo = await isAuthorized(req);

    if (userInfo.accessToken) {
      return res.status(401).json({ message: 'you should renew your access token' });
    }

    // console.log(userInfo);
    if (!userInfo) {
      res.status(401).json({ message: 'this token is not authorized' });
    } else {
      const id = userInfo.id;
      await user.findOne({
        where: {
          id: id,
        },
        include: dog,
      })
      .then((result) => {
        return res.status(200).json({ dogs: result.dataValues.dogs, message: 'ok' });
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({ message: 'no such user in the database' });
      })
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'server error' });
  }
};
