const db = require("../../data/dbconfig");

async function GetAllTwitters() {
  const alltweets = await db("tweets as t")
    .leftJoin("users as u", "t.user_id", "u.user_id")
    .leftJoin("roles as r", "r.role_id", "u.role_id");

  const user = await db("users as u").leftJoin(
    "roles as r",
    "r.role_id",
    "u.role_id"
  );

  let dataArray = [];
  user.forEach((user) => {
    let newUser = {
      username: user.username,
      role_name: user.role_name,
      tweets: [],
    };
    alltweets.forEach((tweet) => {
      let newTweet = {
        tweet_id: tweet.tweet_id,
        tweet: tweet.tweet,
      };
      if (user.user_id === tweet.user_id) {
        newUser.tweets.push(newTweet);
      }
    });
    dataArray.push(newUser);
  });
  return dataArray;
}

async function getById(tweet_id) {
  const ID = await db("tweets").where("tweet_id", tweet_id).first();
  return ID;
}

async function create(tweet) {
  const [newTweet] = await db("tweets").insert(tweet);
  return getById(newTweet);
}

async function update(tweet_id, tweet) {
  const Newtweet = await db("tweets").where("tweet_id", tweet_id).update(tweet);
  return getById(tweet_id);
}

async function TweetRemove(tweet_id) {
  const Id = await getById(tweet_id);
  const removeId = await db("tweets").where("tweet_id", tweet_id).del();
  return Id;
}

async function getByFilter(user) {
  const ID = await db("tweets as t")
    .leftJoin("users as u", "u.user_id", "t.user_id")
    .select("u.username", "u.user_id", "t.tweet", "t.tweet_id")
    .where(user)
    .first();
  return ID;
}

module.exports = {
  GetAllTwitters,
  getById,
  create,
  update,
  TweetRemove,
  getByFilter,
};
