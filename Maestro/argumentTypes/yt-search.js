'use strict';

const BaseType = require("./base");
const regex = new RegExp(`^https?\\:\\/\\/(www\\.)?(youtube\\.com|youtu\\.?be)\\/.+$`)
const ytUrlRegex = /^https?\:\/\/(www\.)?(youtube\.com|youtu\.?be)\/.+$/

/** Represent string type */
class StringType extends BaseType {
    constructor(client) {
        super(client, 'yt-search')
    }

    /**
     * Validate any value
     * @param {string} value The value to validate
     * @returns {Boolean}
     */
    validate(value) {
        return (value.match(ytUrlRegex) || super.validate(value, /^[\w\d\s]+$/i)) ? true : false;
    }

    /**
     * Format any value
     * @param {string} value The value to format
     * @returns {string}
     */
    format(value) {
        return (value.match(ytUrlRegex) ? value.match(ytUrlRegex)[0] : String(value))
    }
}

module.exports = StringType;
