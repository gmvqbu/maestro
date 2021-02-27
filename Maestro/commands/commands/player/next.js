'use strict';

const Player = require("../../../player/Player");
const Command = require("../../base");

class NextCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'next',
            alias: ['skip', 'passe'],
            description: "passe la piste en cours de lecture."
        })
    }

    run(msg) {
        const player = Player.instance(this.client);
        return player.next(msg)
    }
}

module.exports = NextCommand;
