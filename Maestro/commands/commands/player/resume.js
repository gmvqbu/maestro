'use strict';

const Player = require("../../../player/Player");
const Command = require("../../base");

class ResumeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'resume',
            alias: ['p', 'pluspouce'],
            description: "reprends la lecture."
        })
    }

    run(msg) {
        const player = Player.instance(this.client);
        return player.resume(msg)
    }
}

module.exports = ResumeCommand;
