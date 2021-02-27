'use strict';

const Player = require("../../player/Player");
const Command = require("../command");

class ResumeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'resume',
            group: 'player',
            alias: ['p', 'pluspouce']
        })
    }

    run(msg) {
        const player = Player.instance(this.client);
        return player.resume(msg)
    }
}

module.exports = ResumeCommand;
