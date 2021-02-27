'use strict';

const Player = require("../../../player/Player");
const Command = require("../../command");

class ShuffleCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'shuffle',
            alias: ['random', 'mix', 'sens-dessus-dessous']
        })
    }

    run(msg) {
        const player = Player.instance(this.client);
        return player.shuffleQueue(msg);
    }
}

module.exports = ShuffleCommand;
