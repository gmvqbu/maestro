'use strict';

const { ytUrlRegex } = require("../player/YouTube/Youtube");
const BaseType = require("./base");

/** Represent string type */
class StringType extends BaseType {
    constructor(client) {
        super(client, {
            name: 'yt-search',
        })
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
        return (value.match(ytUrlRegex) ? value.match(yt)[0] : String(value))
    }
}

module.exports = StringType;
