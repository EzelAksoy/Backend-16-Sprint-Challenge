const db = require("../../data/dbconfig");

async function getAllComments() {
  const allcomments = await db("comments as c")
    .leftJoin("tweets as t", "t.tweet_id", "c.tweet_id")
    .leftJoin("users as u", "u.user_id", "c.user_id")
    .leftJoin("roles as r", "r.role_id", "u.role_id");

  const alltweets = await db("tweets as t")
    .leftJoin("users as u", "u.user_id", "t.user_id")
    .leftJoin("roles as r ", "r.role_id", "u.role_id");

  const user = await db("users as u").leftJoin(
    "roles as r",
    "u.role_id",
    "r.role_id"
  );
  let dataArray = [];

  user.forEach((element) => {
    let newUser = {
      username: element.username,
      role_name: element.role_name,
      tweets: [],
    };
    alltweets.forEach((tweet) => {
      let newTweet = {
        tweet_id: tweet.tweet_id,
        tweet: tweet.tweet,
        comments: [],
      };
      allcomments.forEach((comment) => {
        let newComment = {
          comment_id: comment.comment_id,
          comment: comment.comment,
        };
        if (tweet.tweet_id === comment.tweet_id) {
          newTweet.comments.push(newComment);
        }
      });
      if (element.user_id === tweet.user_id) {
        newUser.tweets.push(newTweet);
      }
    });
    dataArray.push(newUser);
  });
  return dataArray;
}

async function getByFilter(filter) {
  const comments = await db("comments as c")
    .leftJoin("tweets as t", "t.tweet_id", "c.tweet_id")
    .where(filter);
  return comments;
}

module.exports = { getAllComments, getByFilter };
