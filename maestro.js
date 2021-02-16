'use strict';

const { Client, Config, User } = require('./Maestro/');
const { matchString, matchRegex } = require('./Maestro/util/util');

const client = new Client({
    prefix: Config.botPrefix,
    ownerID: Config.botOwner
});

client.on('ready', () => {
    const bot = User.bot(client, client.user);
    console.log(`Logged in as ${bot.tag} !`);

    if (!matchString(bot.username, Config.botUsername)) bot.updateUsername(Config.botUsername);
});

client.login(Config.botToken);
