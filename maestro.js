'use strict';

const { Client, Config } = require('./Maestro/');
const { setUsername } = require('./Maestro/util/util');

const client = new Client({
    prefix: Config.prefix,
    ownerID: Config.ownerID
});

client.registry.registerDefaults();

client.on('ready', () => {
    // This part is not in the client file cuz it requires the config
    const bot = client.user;
    console.log(`Logged in as ${bot.tag} !`);
    if (bot.username != Config.username) setUsername(bot, Config.username);
});

client.login(Config.token);
