const bcrypt = require('bcrypt');
const { user } = require('../../models');
require('dotenv').config();

// 2021.12.1 완료
module.exports = async (req, res) => {
  const { email, password, username, image } = req.body;
  if (!email || !password || !username) {
    return res.status(400).json({ message: 'Bad Request' });
  } else {
    const conflictUser = await user.findOne({
      where: { email: email },
    });
    if (conflictUser) {
      return res.status(409).json({ message: 'Conflict' });
    } else {

      const hashedPass = await bcrypt.hashSync(password, 10);

      console.log(hashedPass)

      const newUser = await user.create({
        email: email,
        password: hashedPass,
        username: username,
        image: image ? image : null,
      });

      return res.status(201).json({ message : 'ok' });
    }
  }
};
