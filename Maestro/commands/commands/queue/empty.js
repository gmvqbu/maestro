'use strict';

const Player = require("../../../player/Player");
const Command = require("../../base");

class EmptyQueueCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'empty',
            alias: ['delete', 'reset', 'poubelle']
        })
    }

    run(msg) {
        const player = Player.instance(this.client);
        return player.emptyQueue(msg);
    }
}

module.exports = EmptyQueueCommand;
