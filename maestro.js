'use strict';

const { Client, Config } = require('./Maestro/');
const { setUsername } = require('./Maestro/util/util');

const client = new Client({
    prefix: Config.prefix,
    ownerID: Config.ownerID
});

client.registry
    .types.register([
        require('./Maestro/types/string'),
        require('./Maestro/types/yt-search')
    ])
    .commands.register([
        require('./Maestro/commands/util/ping'),
        require('./Maestro/commands/player/play'),
        require('./Maestro/commands/player/stop'),
        require('./Maestro/commands/player/pause'),
        require('./Maestro/commands/player/resume'),
        require('./Maestro/commands/player/next'),
        require('./Maestro/commands/queue/queue'),
        require('./Maestro/commands/queue/empty'),
        require('./Maestro/commands/queue/shuffle')
    ]);

client.on('ready', () => {
    // This part is not in the client file cuz it requires the config
    const bot = client.user;
    console.log(`Logged in as ${bot.tag} !`);
    if (bot.username != Config.username) setUsername(bot, Config.username);
});

client.login(Config.token);
