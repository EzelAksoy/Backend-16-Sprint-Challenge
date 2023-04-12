const { JWT_SECRET } = require("./Secret");

const jwt = require("jsonwebtoken");

exports.createUserToken = (payload, time) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: time });
};
