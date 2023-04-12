const router = require("express").Router();
const bcrypt = require("bcryptjs");
const users_model = require("../Users/Users-model");
const db = require("../../data/dbconfig");
const mw = require("./Auth-middleware");
const utilities = require("../../utilities");

router.post(
  "/register",
  mw.checkRegister,
  mw.Isunique,
  async (req, res, next) => {
    try {
      const Id = await users_model.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
      });
      res.status(201).json(Id);
    } catch (error) {
      next({ status: 500, message: "Internal Server Error" });
    }
  }
);
router.post(
  "/login",
  mw.checkRegister,
  mw.IsValidUsername,
  mw.passwordControl,
  async (req, res, next) => {
    try {
      const user = {
        username: req.body.username,
        role_name: req.body.role_name,
      };
      const token = utilities.createUserToken(user, "1d");
      res.json({ message: `welcome ${user.username}`, token: token });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
