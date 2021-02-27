'use strict';

const Player = require("../../../player/Player");
const Command = require("../../base");

class StopCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'stop',
            alias: ['disconnect', 'leave']
        })
    }

    run(msg) {
        const player = Player.instance(this.client);
        return player.stop(msg);
    }
}

module.exports = StopCommand;
