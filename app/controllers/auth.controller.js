const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../../config/auth.config");
const db = require("../../models");
// Ensure this matches your exported model name for the alloy_Users table
const User = db.User; 

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username
      }
    });

    if (!user) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid user or password!"
      });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid user or password!"
      });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      algorithm: 'HS256',
      expiresIn: 86400 // 24 hours
    });

    res.status(200).send({
      id: user.id,
      username: user.username,
      accessToken: token
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};