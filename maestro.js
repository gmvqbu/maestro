'use strict';

const Discord = require('discord.js');
const Maestro = require('./Maestro');
const token = null;

const client = new Client({
    commandPrefix: '!',
    botOwner: '757632847128428546'
})

bot.on('ready', function () {
    console.log(`Logged in as ${bot.user.tag} !`)
})

bot.login(token);
