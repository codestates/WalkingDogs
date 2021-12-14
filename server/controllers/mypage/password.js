const { user } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
  console.log('passwordAPI')
  try {
    const userInfo = await isAuthorized(req);

    if (userInfo.accessToken) {
      res.status(401).json({ message: 'you should renew your access token' });
    }

    // console.log('userInfo: ', userInfo);
    const passwords = req.body;
    console.log('password', passwords);
    const userData = await user.findOne({
      where: {
        id: userInfo.id,
      },
    });
    console.log('userData.dataValues: ', userData.dataValues);
    if (!userData) {
      res.status(400).json({ message: 'no such user in the database' });
    } else {
      // console.log('userData: ', userData);
      const check = await bcrypt.compareSync(
                passwords.old_password,
                userData.dataValues.password
              )
              
      if (!check)
      {
        res.status(400).json({ message: 'old password does not match' });
      } else {
        if (passwords.new_password === passwords.new_password_check) {
          console.log(passwords.new_password);
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
    console.log(err);
    res.status(500).json({ message: 'server error' });
  }
};
