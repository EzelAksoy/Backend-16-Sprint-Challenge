const router = require("express").Router();
const tweets_model = require("./Tweets-model");
const mw = require("./Tweets-middleware");

router.get("/", async (req, res, next) => {
  try {
    const allTweets = await tweets_model.GetAllTwitters();
    res.status(201).json(allTweets);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", mw.CheckedId, async (req, res, next) => {
  try {
    const Id = await tweets_model.getById(req.params.id);
    res.status(201).json(Id);
  } catch (error) {
    next(error);
  }
});

router.post("/", mw.CheckPayload, async (req, res, next) => {
  try {
    const newTweet = await tweets_model.create({
      tweet: req.body.tweet,
      user_id: req.body.user_id,
    });
    res.status(201).json(newTweet);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    let updateTweet = await tweets_model.update(req.params.id, {
      tweet_id: req.body.tweet_id,
      tweet: req.body.tweet,
    });
    res.status(201).json(updateTweet);
  } catch (error) {
    next(error);
  }
});
router.delete("/:id", mw.checkUserId, async (req, res, next) => {
  try {
    const removeTweet = await tweets_model.TweetRemove(req.params.id);
    res.status(201).json(removeTweet);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
