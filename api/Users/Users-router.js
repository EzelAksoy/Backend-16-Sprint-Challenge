const router = require("express").Router();
const users_model = require("./Users-model");
const bcrypt = require("bcryptjs");
const authMw = require("../Auth/Auth-middleware");
const userMw = require("./Users-middleware");

router.get("/", authMw.restricted, async (req, res, next) => {
  try {
    const alluser = await users_model.getAllUsers();
    res.status(201).json(alluser);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const Id = await users_model.getById(req.params.id);
    if (!Id) {
      res
        .status(404)
        .json({ message: `${req.params.id} number user couldnt found` });
    } else {
      res.status(201).json(Id);
    }
  } catch (error) {
    next(error);
  }
});

router.delete(
  "/:id",
  authMw.restricted,
  authMw.ExistID,
  userMw.checkUserId,
  async (req, res, next) => {
    try {
      const Id = await users_model.deleteById(req.params.id);
      res.status(201).json(Id);
    } catch (error) {
      next(error);
    }
  }
);
router.put("/:id", async (req, res, next) => {
  try {
    const Id = await users_model.update(req.params.id, {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    res.status(201).json(Id);
  } catch (error) {
    next(error);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const Id = await users_model.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    res.status(201).json(Id);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
