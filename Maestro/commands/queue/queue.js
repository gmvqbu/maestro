'use strict';

const Player = require("../../player/Player");
const Command = require("../command");

class QueueCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'queue',
            group: 'player-queue',
            alias: ['playlist', 'list']
        })
    }

    run(msg) {
        const player = Player.instance(this.client);
        return player.displayQueue(msg);
    }
}

module.exports = QueueCommand;
