const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authRouter = require("./Auth/Auth-router");
const userRouter = require("./Users/Users-router");
const tweetRouter = require("./Tweets/Tweets-router");
const commentRouter = require("./Comments/Comments-router");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/users", userRouter);
server.use("/api/tweets", tweetRouter);
server.use("/api/comments", commentRouter);

module.exports = server;
