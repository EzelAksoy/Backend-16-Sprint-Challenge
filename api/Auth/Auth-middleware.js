const db = require("../../data/dbconfig");
const users_model = require("../Users/Users-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../Secret");

const checkRegister = (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    if (!username) {
      res.status(400).json({ message: "Please write your username" });
    } else if (!password) {
      res.status(400).json({ message: "Please write your password" });
    } else if (!email) {
      res.status(400).json({ message: "Please write your email" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};
const roleNameCheck = async (req, res, next) => {};
const Isunique = async (req, res, next) => {
  const username = req.body.username;
  const Isexist = await users_model.getByFilter({ username: username });
  if (Isexist) {
    res.status(402).json({ message: `${username} is already used` });
  } else next();
};

function restricted(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decodedJwt) => {
      if (err) {
        res.status(402).json({ message: "Token is unvalid" });
      } else {
        req.userData = decodedJwt;
        next();
      }
    });
  } else {
    res.status(402).json({ message: "Token not found" });
  }
}

const IsValidUsername = async (req, res, next) => {
  try {
    const username = req.body.username;
    const Isexist = await users_model.getByFilter({ username: username });
    if (!Isexist) {
      res.status(404).json({ message: "this username couldnt found" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};
const passwordControl = async (req, res, next) => {
  try {
    const user = await users_model.getByFilter({ username: req.body.username });
    const password = req.body.password;
    const IsPassword = bcrypt.compareSync(password, user.password);
    if (!IsPassword) {
      res.status(404).json({ message: "this password is unvalid" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const ExistID = async (req, res, next) => {
  try {
    const Id = await users_model.getById(req.params.id);
    if (!Id) {
      res
        .status(402)
        .json({ message: ` This ${req.params.id} ID number is not exist` });
    } else {
      next();
    }
  } catch (error) {
    nexy(error);
  }
};

module.exports = {
  checkRegister,
  roleNameCheck,
  Isunique,
  IsValidUsername,
  passwordControl,
  restricted,
  ExistID,
};
