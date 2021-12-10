const { user } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
  try {
    const userInfo = await isAuthorized(req);

    if (userInfo.accessToken) {
      res.status(401).json({ message: 'you should renew your access token' });
    }

    // console.log('userInfo: ', userInfo);
    const passwords = req.body;
    // console.log('password', passwords);
    const userData = await user.findOne({
      where: {
        id: userInfo.id,
      },
    });
    if (!userData) {
      res.status(400).json({ message: 'no such user in the database' });
    } else {
      // console.log('userData: ', userData);

      if (
        !bcrypt.compareSync(
          passwords.old_password,
          userData.dataValues.password,
        )
      ) {
        res.status(400).json({ message: 'old password does not match' });
      } else {
        if (passwords.new_password === passwords.new_password_check) {
          const hashedPass = await bcrypt.hashSync(passwords.new_password, 10);
          if (!hashedPass) {
            res.status(400).json({ message: 'hash not created' });
          }
          const updatedUser = await user.update(
            { password: hashedPass },
            {
              where: {
                id: userInfo.id,
              },
            },
          );
          if (!updatedUser) {
            res.status(400).json({ message: 'update failed' });
          } else {
            res.status(200).json({ message: 'ok' });
          }
        } else {
          res.status(400).json({ message: 'password does not match' });
        }
      }
    }
  } catch (err) {
    console.error;
    res.status(500).json({ message: 'server error' });
  }
};
