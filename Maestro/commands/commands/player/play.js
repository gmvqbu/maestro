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
                    type: 'yt-url',
                    infinite: true
                }
            ]
        })
    }

    async run(msg, args) {
        const query = 'query' in args ? args.query : null;
        return Player.instance(this.client).play(msg, msg.member.voice.channel, await query)
    }
}

module.exports = PlayCommand;
