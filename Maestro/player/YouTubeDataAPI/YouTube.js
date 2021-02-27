'use strict';

const YouTubeDataAPI = require("../apis/YouTubeDataAPI");
const YouTubeTrack = require("../tracks/YouTubeTrack");
const ytUrlRegex = /^https?\:\/\/(www\.)?(youtube\.com|youtu\.?be)\/.+$/

class YouTube {
    constructor(client) {
        Object.defineProperty(this, 'client', { value: client })

        /**
         * @type {YouTubeDataAPI}
         */
        this.api = new YouTubeDataAPI()
    }

    static async video(msg, query) {
        // console.log(msg.embeds)
        // Récupérer les infos des vidéos depuis l'embed du message
        // Sinon, effectuer une recherche avec l'API
        // const data = await this.api.fetchVideoFromString(query)[0]
        // en attendant, je charge mon fichier json pour pas manger tout mon quota
        const data = require('../../../config/tmp.yt.search.json').items[0];    // temp
        return new YouTubeTrack(data);
    }

    static parserUrl(url) {
        return url.replace(/^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/(\?v=)/, '');
    }
}

module.exports = {
    YouTube,
    ytUrlRegex
};
