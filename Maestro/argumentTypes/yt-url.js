'use strict';

const ArgumentType = require("./base");
const youtubeUrl = new RegExp('^https?\\:\\/\\/(www\\.)?(youtube\\.com|youtu\\.?be)\/[\\?\\=\\w]+');

/** Represent string type */
class YouTubeUrlArgumentType extends ArgumentType {
    constructor(client) {
        super(client, 'yt-url');
    }

    /**
     * Validate any value
     * @param {string} value The value to validate
     * @returns {Boolean}
     */
    validate(value) {
        return value.match(youtubeUrl) ? true : false;
    }

    /**
     * Format any value
     * @param {string} value The value to format
     * @returns {string}
     */
    format(value) {
        return youtubeUrl.exec(value)[0]
    }
}

module.exports = YouTubeUrlArgumentType;
