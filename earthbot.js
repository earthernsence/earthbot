/* eslint-disable max-len */
/* eslint-disable no-debugger */
/* eslint-disable no-console */
/* eslint-disable camelcase */
"use strict";

const Discord = require("discord.js");
const { isUndefined } = require("util");
const client = new Discord.Client();
const token = "";
let isRankEnabled = true;
const date = Date.now();

client.on("ready", () => {
    const mainChat = client.channels.cache.get("722486630367363112");
    mainChat.send(`Bot is online at ${new Date(Date.now())}`);
});

client.on("message", message => {
    if (isUndefined(message.author.diffTotal) || isNaN(message.author.diffTotal)) message.author.diffTotal = 60;
    setInterval(increaseDiff, 1000);
    if (isUndefined(message.author.experience)) message.author.experience = 0;
    if (isUndefined(message.author.messagesCountedForExperience)) message.author.messagesCountedForExperience = 0;
    if (isNaN(message.author.messageCount)) message.author.messageCount = 0;
    if (isNaN(message.author.experience)) message.author.experience = 0;
    message.author.messageCount++;
    console.log(date);
    if (!message.content.startsWith("++") || !message.author.bot) {
        gainExperience(message.author);
    } else if (message.content === "good bot") {
        message.channel.send("Aww, thank you! <3");
    } else if (message.content === "bad bot") {
        message.channel.send("No need to be so harsh!");
    } else if (message.author.bot) {
        return;
    }
    if (message.content === "++rank" && isRankEnabled) {
        message.channel.send(`Ranking for ${message.author}:
        Message count: ${message.author.messageCount}
        Messages counted for experience: ${message.author.messagesCountedForExperience}

        Rank: ${message.author.level} (${(5 * (Math.pow(message.author.level, 1.5)) + 50 * message.author.level + 100) - message.author.experience} until next level)
        Experience: ${message.author.experience}
        `);
    } else if (message.content === "++rank" && !isRankEnabled) {
        message.channel.send(`Ranking is currently disabled.`);
    }
    if (message.content === "++rank toggle") {
        isRankEnabled = !isRankEnabled;
        message.channel.send(`Rank is now ${isRankEnabled ? "enabled." : "disabled."}`);
        console.log(`Ranking is now set to ${isRankEnabled}`);
        console.log(message.author);
    }
    if (message.content === "++diff") {
        message.channel.send(`${message.author.diffTotal}`);
    }
    function increaseDiff() {
        message.author.diffTotal++;
    }
});

 
 function gainExperience(user) {
     if (!isRankEnabled) return;
     if (user.bot) return;
     if (user.diffTotal <= 59) return;

     if (isNaN(user.level)) user.level = 0;
     if (isNaN(user.experience)) user.experience = 0;
     if (isNaN(user.messagesCountedForExperience)) user.messagesCountedForExperience = 0;

     if (user.diffTotal >= 60) {
     user.diffTotal = 0;
     user.lastGainedExperience = user.date;
     user.experience += Math.floor((Math.random() * 10) + 10);
     if (user.experience >= 5 * (Math.pow(user.level, 1.5)) + 50 * user.level + 100) {
        user.level++;
        user.experience = 0;
        user.channel.send(`Congratulations! You ranked up to ${user.level}. You need ${(5 * (Math.pow(message.author.level, 1.5)) + 50 * message.author.level + 100)} experience for the next level.`);
     }
     console.log(`Experience for ${user}: ${user.experience}`);

     // Level formula: 5 * (Math.pow(user.level, 1.5)) + 50 * user.level + 100

     user.messagesCountedForExperience++;
     }
 }


client.login(token);

