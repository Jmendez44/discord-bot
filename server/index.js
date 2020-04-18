const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const colors = require("colors");
const morgan = require("morgan");
const PORT = process.env.PORT || 5000;

const MongoClient = require("mongodb").MongoClient;
const uri = `${process.env.DB}`;
const dbClient = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
dbClient.connect((err) => {
  const collection = dbClient.db("test").collection("devices");
  // perform actions on the collection object
  dbClient.close();
});

// Import the discord.js module
const Discord = require("discord.js");
// Create an instance of a Discord client
const discordClient = new Discord.Client();
/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
discordClient.on("ready", () => {
  console.log("I am ready!");
});
// Create an event listener for messages
discordClient.on("message", (message) => {
  if (message.content === "!jelani") {
    message.channel.send("likes toes");
  }
});
// Log our bot in using the token from https://discordapp.com/developers/applications/me
discordClient.login(`${process.env.DISCORD}`);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT} in ${process.env.NODE_ENV} `);
});
