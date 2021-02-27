'use strict';

const Player = require("../../../player/Player");
const Command = require("../../base");

class PauseCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'pause',
            alias: ['restart', 'pouce']
        })
    }

    run(msg) {
        const player = Player.instance(this.client);
        return player.pause(msg)
    }
}

module.exports = PauseCommand;
