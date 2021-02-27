'use strict';

const ytdl = require('ytdl-core-discord');

/** This Object takes some elements of the Discord.MessageEmbed */

/** Represent a music */
class BaseTrack {
    constructor(data) {
        /**
         * This media title
         * @type {string}
         */
        this.title = 'title' in data ? data.title : null;
        if (!this.title) throw Error(`Music title cannot be null`);

        /**
         * This media url
         * @type {string}
         */
        this.url = 'url' in data ? data.url : null;
        if (!this.title) throw Error(`Music url cannot be null`);

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
                name: data.author.name,
                url: data.author.url
            }
            : null;
    }

    async getStream() {
        return await ytdl(this.url);
    }
}

module.exports = BaseTrack;
