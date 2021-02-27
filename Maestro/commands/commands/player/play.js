'use strict';

const Player = require("../../../player/Player");
const Command = require("../../base");

class PlayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'play',
            alias: ['connect', 'join', 'add'],
            args: [
                {
                    key: 'query',
                    label: 'Recherche',
                    type: 'yt-search',
                    infinite: true
                }
            ]
        })
    }

    run(msg, args) {
        const query = 'query' in args ? args.query : null;
        const player = Player.instance(this.client);
        return player.play(msg, msg.member.voice.channel ?? null, query)
    }
}

module.exports = PlayCommand;
