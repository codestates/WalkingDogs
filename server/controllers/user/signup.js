const { user } = require('../../models');
require('dotenv').config();

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
      const newUser = await user.create({
        email: email,
        password: password,
        username: username,
        image: image,
      });
      return res.status(201).send(newUser);
    }
  }
};
