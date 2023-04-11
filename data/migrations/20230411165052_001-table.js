/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("roles", (role) => {
      role.increments("role_id");
      role.string("role_name", 125).notNullable();
    })
    .createTable("users", (user) => {
      user.increments("user_id");
      user.string("username", 125).notNullable().unique();
      user.string("email", 125).notNullable().unique();
      user.integer("password", 125).notNullable();
      user
        .integer("role_id")
        .defaultTo(2)
        .references("role_id")
        .inTable("roles")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("tweets", (tweet) => {
      tweet.increments("tweet_id");
      tweet.string("tweet", 255);
      tweet
        .integer("user_id")
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("comments", (comment) => {
      comment.increments("comment_id");
      comment.string("comment", 255);
      comment
        .integer("user_id")
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      comment
        .integer("tweet_id")
        .notNullable()
        .references("tweet_id")
        .inTable("tweets")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("comments")
    .dropTableIfExists("tweets")
    .dropTableIfExists("users")
    .dropTableIfExists("roles");
};
