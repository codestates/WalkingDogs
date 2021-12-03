const { user } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = async (req, res) => {
  const userInfo = await isAuthorized(req);
  console.log('userInfo: ', userInfo);
  const passwords = req.body;
  console.log('password', passwords);
  const userData = await user.findOne({
    where: {
      id: userInfo.id,
    },
  });
  if (!userData) {
    res.status(401).send({ message: 'no such user in the database' });
  } else {
    console.log('userData: ', userData);
    if (userData.dataValues.password !== passwords.old_password) {
      res.status(400).send({ message: 'old password does not match' });
    } else {
      if (passwords.new_password === passwords.new_password_check) {
        const updatedUser = await user.update(
          { password: passwords.new_password },
          {
            where: {
              id: userInfo.id,
            },
          },
        );
        if (!updatedUser) {
          res.status(400).send({ message: 'bad request' });
        } else {
          res.status(200).send({ message: 'ok' });
        }
      } else {
        res.status(400).send({ message: 'password does not match' });
      }
    }
  }
  // res.send('Hello World from Password path')
};
