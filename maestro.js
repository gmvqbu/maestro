'use strict';

const Discord = require('discord.js');
const { Client } = require('./Maestro/');
const token = null;

const bot = new Client({
    prefix: '!',
    owner: '757632847128428546'
})

bot.on('ready', function () {
    console.log(`Logged in as ${bot.user.tag} !`)
})

bot.login(token);
