const db = require("../../data/dbconfig");
const tweet_model = require("./Tweets-model");
const user_model = require("../Users/Users-model");

const CheckedId = async (req, res, next) => {
  const Id = await tweet_model.getById(req.params.id);
  if (!Id) {
    res.status(404).json({ message: `Number ${req.params.id}  couldnt found` });
  } else {
    next();
  }
};

const CheckPayload = async (req, res, next) => {
  const { tweet, user_id } = req.body;
  const UserId = await user_model.getById(req.body.user_id);
  if (!tweet) {
    res.status(402).json({ message: " Please write your tweet" });
  } else if (!user_id) {
    res.status(402).json({ message: "You cant send tweet without user_id" });
  } else if (!UserId) {
    res
      .status(404)
      .json({ message: `Number ${req.body.user_id} user_id  couldnt found` });
  } else {
    next();
  }
};

const checkUserId = async (req, res, next) => {
  const UserId = req.headers.username;
  const Id = await tweet_model.getByFilter({ username: UserId });
  const TweetId = await tweet_model.getById(req.params.id);

  if (TweetId !== Id.username) {
    res
      .status(402)
      .json({ message: "you dont have authorization for progress" });
  } else {
    next();
  }
};

module.exports = { CheckedId, CheckPayload, checkUserId };
