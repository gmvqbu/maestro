'use strict';

const { Client, Config } = require('./Maestro/');
const { setUsername } = require('./Maestro/util/util');

const client = new Client({
    prefix: Config.prefix,
    ownerID: Config.ownerID
});

client.registry
    .types.register([
        require('./Maestro/argumentTypes/string'),
        require('./Maestro/argumentTypes/yt-search')
    ])
    .commands.register([
        require('./Maestro/commands/commands/util/ping'),
        require('./Maestro/commands/commands/player/play'),
        require('./Maestro/commands/commands/player/stop'),
        require('./Maestro/commands/commands/player/pause'),
        require('./Maestro/commands/commands/player/resume'),
        require('./Maestro/commands/commands/player/next'),
        require('./Maestro/commands/commands/queue/queue'),
        require('./Maestro/commands/commands/queue/empty'),
        require('./Maestro/commands/commands/queue/shuffle')
    ]);

client.on('ready', () => {
    // This part is not in the client file cuz it requires the config
    const bot = client.user;
    console.log(`Logged in as ${bot.tag} !`);
    if (bot.username != Config.username) setUsername(bot, Config.username);
});

client.login(Config.token);
