'use strict';

const Discord = require('discord.js');
const bot = new Discord.Client();
const token = null;

bot.on('ready', function () {
    console.log(`Logged in as ${bot.user.tag} !`)
})

bot.login(token);
