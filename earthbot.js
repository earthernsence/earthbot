/* eslint-disable no-inline-comments */
/* eslint-disable no-console */
/* eslint-disable camelcase */
"use strict";

const Discord = require("discord.js");
const client = new Discord.Client();
const token /* Your token here */ = "";
let isRankEnabled = true;
let date = Date.now();

client.on("ready", () => {
    const mainChat = client.channels.cache.get("722176672501334098");
    mainChat.send("I have a dream");
});

client.on("message", message => {
    if (isNaN(message.author.messageCount)) message.author.messageCount = 0;
    message.author.messageCount++;
    gainExperience(message.author);
    console.log(date);
    if (!message.content.startsWith("++") || message.author.bot) {
        return;
    }
    if (message.content === "++rank" && isRankEnabled) {
        message.channel.send(`Ranking for ${message.author}:
        Message count: ${message.author.messageCount}
        Messages counted for experience: ${message.author.messagesCountedForExperience}

        Rank: Not coded
        Experience: ${message.author.experience}
        `);
    }
    if (message.content === "++rank toggle") {
        isRankEnabled = !isRankEnabled;
        message.channel.send(`Rank is now ${isRankEnabled ? "enabled." : "disabled."}`);
        console.log(`Ranking is now set to ${isRankEnabled}`);
        console.log(message.author);
    }
    //
    // gainExperience(message.author);
});
 
 function gainExperience(user) {
     if (!isRankEnabled) return;
     if (user.bot) return;
     user.lastGainedExperience = date + 60000;
     if (isNaN(user.level)) user.level = 0;
     if (isNaN(user.experience)) user.experience = 0;
     console.log(`Experience for ${user}: ${user.experience}`);
     if (isNaN(user.messagesCountedForExperience)) user.messagesCountedForExperience = 0;
     let diff = 60000;

     if (diff >= 60000) {
     diff = 0;
     user.lastGainedExperience = user.date;
     user.experience = (Math.random() * 10) + 10;

     // Level formula: 5 * (Math.pow(user.level, 1.5)) + 50 * user.level + 100

     user.messagesCountedForExperience++;
     }
 }


client.login(token);

