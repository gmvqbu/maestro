'use strict';

const ArgumentType = require("./base");
const youtubeUrl = new RegExp('^https?\\:\\/\\/(www\\.)?(youtube\\.com|youtu\\.?be)\/[\\?\\=\\w]+');

/** Represent string type */
class YouTubeUrlArgumentType extends ArgumentType {
    constructor(client) {
        super(client, 'yt-url');
    }

    validate(value) {
        return super.validate(value, youtubeUrl);
    }

    async parse(msg) {
        // Returns the embed to save some YouTube API points
        return msg.embeds[0];
    }
}

module.exports = YouTubeUrlArgumentType;
