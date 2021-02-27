'use strict';

const Music = require("../BaseTrack");

class EmbedTrack extends Music {
    constructor(data) {
        super({
            title: data.title ?? null,
            url: data.video.url ?? null,
            author: {
                name: data.author.name ?? null,
                url: data.author.url ?? null
            }
        });
    }
}

module.exports = EmbedTrack;
