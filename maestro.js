'use strict';

const { Client, Config, User } = require('./Maestro/');

const client = new Client({
    prefix: Config.prefix,
    ownerID: Config.ownerID
});

client.registry.registerDefaults()

client.on('ready', () => {
    const bot = new User(client, client.user);
    console.log(`Logged in as ${bot.tag} !`);

    if (bot.username != Config.username) bot.updateUsername(Config.username);
});

client.login(Config.token);
