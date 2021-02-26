'use strict'

const { google } = require('googleapis');
const keys = require('../../../config/googleapis.keys.json');

const youtube = google.youtube({
    version: 'v3',
    auth: keys.youtube_data
});

/** Interacts with the YouTube Data API */
class YouTubeDataAPI {
    /**
     * Return a list of data from any YouTube Data API Ressource
     * @param {*} ressource
     * @param {Object} params
     */
    static async #fetchData(ressource, params) {
        return new Promise(async (resolve, reject) => {
            ressource.list(params, (err, res) => {
                if (err) reject(err)
                if (response) resolve(response.data)
            });
        })
    }

    /**
     * Fetch a YouTube video from a query string
     * @param {string} query
     * @param {int} maxResults
     */
    static async fetchVideoFromString(query, maxResults = 1) {
        return await this.#fetchData(youtube.channels, {
            part: 'snippet',
            chart: 'mostPopular',
            maxResults: maxResults,
            q: query
        })
    }
y
}

module.exports = YouTubeDataAPI;
