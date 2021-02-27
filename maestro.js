'use strict';

const { Client, Config } = require('./Maestro/');
const { setUsername } = require('./Maestro/util/util');

const client = new Client({
    prefix: Config.prefix,
    ownerID: Config.ownerID
});

client.registry
    .types.register([
        require('../types/string'),
        require('../types/yt-search')
    ])
    .commands.register([
        require('../commands/util/ping'),
        require('../commands/player/play'),
        require('../commands/player/stop'),
        require('../commands/player/pause'),
        require('../commands/player/resume'),
        require('../commands/player/next'),
        require('../commands/queue/queue'),
        require('../commands/queue/empty'),
        require('../commands/queue/shuffle')
    ]);

client.on('ready', () => {
    // This part is not in the client file cuz it requires the config
    const bot = client.user;
    console.log(`Logged in as ${bot.tag} !`);
    if (bot.username != Config.username) setUsername(bot, Config.username);
});

client.login(Config.token);
