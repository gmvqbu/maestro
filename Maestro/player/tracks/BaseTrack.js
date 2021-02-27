'use strict';

const ytdl = require('ytdl-core-discord');

/** This Object takes some elements of the Discord.MessageEmbed */

/** Represent a music */
class BaseTrack {
    constructor(data) {
        this.constructor.validateData(data);

        /**
         * This media title
         * @type {string}
         */
        this.title = data.title;

        /**
         * This media url
         * @type {string}
         */
        this.url = data.url;

        /**
         * @typedef {Object} MusicAuthor
         * @property {string} name The author name
         * @property {url} url This author page url
         */
        /**
         * @type {MusicAuthor}
         */
        this.author = data.author
            ? {
                name: data.author.name ?? null,
                url: data.author.url ?? null
            }
            : null;
    }

    async getStream() {
        return await ytdl(this.url);
    }

    static validateData(data) {
        if (!data.title) throw Error(`Music title cannot be null`);
        if (!data.url) throw Error(`Music url cannot be null`);
    }
}

module.exports = BaseTrack;
