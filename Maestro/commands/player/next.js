'use strict';

const Player = require("../../player/Player");
const Command = require("../command");

class NextCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'next',
            group: 'player',
            alias: ['skip', 'passe'],
        })
    }

    run(msg) {
        const player = Player.instance(this.client);
        return player.next(msg)
    }
}

module.exports = NextCommand;
