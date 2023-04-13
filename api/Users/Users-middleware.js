const user_model = require("./Users-model");

const checkUserId = async (req, res, next) => {
  const UserName = req.headers.username;
  const Id = await user_model.getByFilter({ username: UserName });
  const UserID = await user_model.getById(req.params.id);

  if (UserID.user_id !== Id.user_id) {
    res
      .status(402)
      .json({ message: "you dont have authorations for that progress" });
  } else {
    next();
  }
};

module.exports = { checkUserId };
