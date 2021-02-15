'use strict';

const { Client, Config, User } = require('./Maestro/');

const client = new Client({
    prefix: Config.botPrefix,
    ownerID: Config.botOwner
});

client.on('ready', () => {
    const bot = new User(client, client.user);
    console.log(`Logged in as ${bot.tag} !`);

    if (!bot.matchUsername(Config.botUsername)) bot.updateUsername(Config.botUsername);
});

client.login(Config.botToken);
