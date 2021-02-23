'use strict';

const commands = require('./config/commands');
const { Client, Config, User } = require('./Maestro/');
const BaseManager = require('./Maestro/src/registry/base');

const client = new Client({
    prefix: Config.botPrefix,
    ownerID: Config.botOwner
});

new BaseManager(client, client.registry)

client.registry
    .types.register([
        require('./Maestro/types/string')
    ])
    .commands.register(commands);

client.on('ready', () => {
    const bot = new User(client, client.user);
    console.log(`Logged in as ${bot.tag} !`);

    if (bot.username != Config.botUsername) bot.updateUsername(Config.botUsername);
});

client.login(Config.botToken);
