'use strict';

const Music = require("./BaseTrack");

class YouTubeTrack extends Music {
    constructor(data) {
        super({
            title: data.snippet.title ?? null,
            url: data.id.videoId ? `https://youtube.com/watch?v=${data.id.videoId}` : null,
            author: {
                name: data.snippet.channelTitle ?? null,
                url: data.snippet.channelId ? `https://youtube.com/channel/${data.snippet.channelId}` : null,
            }
        });
    }
}

module.exports = YouTubeTrack;
