const { user, dog } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = async (req, res) => {
  try {
    const userInfo = await isAuthorized(req);

    if (userInfo.accessToken) {
      res.status(401).json({ message: 'you should renew your access token' });
    }

    // console.log(userInfo);
    if (!userInfo) {
      res.status(401).json({ message: 'this token is not authorized' });
    } else {
      const id = userInfo.id;
      const dogList = await user.findOne({
        where: {
          id: id,
        },
        include: dog,
      })
      .then((result) => {
        return res.status(200).json({ dogs: result.dataValues.dogs, message: 'ok' });
      })
      .catch((err) => {
        return res.status(400).json({ message: 'no such user in the database' });
      })
      // if (!dogList) {
      //   res.status(400).json({ message: 'no such user in the database' });
      // } else {
      //   res.status(200).json({ dogs: dogList.dataValues.dogs, message: 'ok' });
      // }
    }
  } catch (err) {
    console.error;
    res.status(500).json({ message: 'server error' });
  }
};
