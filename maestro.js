'use strict';

const { Client, Config, User } = require('./Maestro/');
const { matchString } = require('./Maestro/util/util');

const client = new Client({
    prefix: Config.botPrefix,
    ownerID: Config.botOwner
});

client.registry.registerCommand(
    require('./Maestro/commands/mod/ping.js')
);

client.on('ready', () => {
    const bot = new User(client, client.user);
    console.log(`Logged in as ${bot.tag} !`);

    if (!matchString(bot.username, Config.botUsername)) bot.updateUsername(Config.botUsername);
});

client.login(Config.botToken);
