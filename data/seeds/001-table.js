/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("roles").truncate();
  await knex("users").truncate();
  await knex("tweets").truncate();
  await knex("comments").truncate();
  await knex("roles").insert([
    { role_name: "admin", role_id: 1 },
    { role_name: "user", role_id: 2 },
  ]);
  await knex("users").insert([
    {
      username: "Ezel",
      email: "aksoy.ezel@gmail.com",
      password: 12345,
      role_id: 1,
    },
    {
      username: "Aden",
      email: "aksoy.aden@gmail.com",
      password: 123456,
      role_id: 1,
    },
    {
      username: "Sue",
      email: "sue@gmail.com",
      password: 1234567,
      role_id: 2,
    },
    {
      username: "Boe",
      email: "boe@gmail.com",
      password: 1234,
      role_id: 2,
    },
    {
      username: "Daniel",
      email: "adaniel@gmail.com",
      password: 1234578,
      role_id: 2,
    },
  ]);
  await knex("tweets").insert([
    {
      tweet: "Happy Birtday,Samantha",
      user_id: 1,
    },
    {
      tweet: "Which Day?",
      user_id: 1,
    },
    {
      tweet: "Don't forget your gift:)",
      user_id: 2,
    },
    {
      tweet: "Where are you??",
      user_id: 2,
    },
    {
      tweet: "Next Time!!!",
      user_id: 2,
    },
    {
      tweet: "Everybody have watch on News",
      user_id: 3,
    },
    {
      tweet: "Bla Bla",
      user_id: 3,
    },
    {
      tweet: "Fenerbahçe, there is no big club such as Fenerbahçe",
      user_id: 3,
    },
    {
      tweet: "Dolar $$$$",
      user_id: 4,
    },
    {
      tweet: "Good Nigt Everybody",
      user_id: 4,
    },
    {
      tweet: "Foreign issues :(",
      user_id: 5,
    },
  ]);
  await knex("comments").insert([
    {
      comment: "Congratulations Samantha! I wish everything be good for you",
      user_id: 2,
      tweet_id: 1,
    },
    {
      comment: "Congratulationssss!!!",
      user_id: 5,
      tweet_id: 1,
    },
    {
      comment: "Monday,it can be good",
      user_id: 3,
      tweet_id: 2,
    },
    {
      comment: "I'm sorry I wouldnt join you",
      user_id: 4,
      tweet_id: 2,
    },
    {
      comment: "its ok",
      user_id: 5,
      tweet_id: 2,
    },
    {
      comment: "Dont worry :D",
      user_id: 1,
      tweet_id: 3,
    },
    {
      comment: "I'am on way",
      user_id: 3,
      tweet_id: 4,
    },
    {
      comment: "What Happend???",
      user_id: 1,
      tweet_id: 6,
    },
    {
      comment: "Are you sure???",
      user_id: 5,
      tweet_id: 8,
    },
    {
      comment: "Rich man :D",
      user_id: 2,
      tweet_id: 9,
    },
    {
      comment: "Zzzzzz :)",
      user_id: 2,
      tweet_id: 10,
    },
    {
      comment: "I think we would not solve that problem",
      user_id: 1,
      tweet_id: 11,
    },
    {
      comment: "We will see",
      user_id: 3,
      tweet_id: 11,
    },
    {
      comment:
        "Sometimes I dreamed I live in another countries because of that",
      user_id: 4,
      tweet_id: 11,
    },
  ]);
};
