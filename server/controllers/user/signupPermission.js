const bcrypt = require('bcrypt');
const { user } = require('../../models');

module.exports = async (req, res) => {
  const { email, password, username, image } = req.body;

  try {
    const hashedPass = await bcrypt.hashSync(password, 10);
    console.log(hashedPass);

    await user.create({
      email: email,
      password: hashedPass,
      username: username,
      image: image ? image : null,
    });

    return res.status(201).json({ message: 'ok' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'server err' });
  }
};
