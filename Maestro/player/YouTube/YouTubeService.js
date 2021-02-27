'use strict';

/**
 * NOTE
 * Each day you have a quota of 10 000 units to interact with the Google API
 * Fetch a video, channel or playlist from an id cost 1 point
 * Search a video, channel or playlist cost 100 points
 */

const YouTubeDataAPI = require("./YouTubeDataAPI");
const YouTubeTrack = require("./YouTubeTrack");

class YouTubeService {
    constructor(client) {
        Object.defineProperty(this, 'client', { value: client })

        /**
         * @type {YouTubeDataAPI}
         */
        this.api = new YouTubeDataAPI()
    }

    static async video(query) {
        const data = await this.api.fetchVideoFromSearch(query);
        return new YouTubeTrack(data);
    }
}

module.exports = YouTubeService;
