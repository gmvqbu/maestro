'use strict';

const { player } = require('../util/constants');
const Queue = require("./Queue");
const Voice = require('./Voice');
const YouTubeService = require('./YouTube/YouTubeService');
const { MessageEmbed } = require('discord.js');
const EmbedTrack = require('./Embed/EmbedTrack');

/** Represent the music player */
class Player {
    /**
     * This instance
     * @static
     * @type {ThisType<Player>}
     */
    static $instance = null;

    /**
     * The current voice connection
     * @type {Discord.VoiceConnection}
     */
    connection;

    /**
     * The current stream status
     * @type {stream.Readable}
     */
    status = player.OFF;

    /**
     * This streamDispatcher
     * @type {Discord.StreamDispatcher}
     */
    dispatcher;

    static instance(client) {
        if (this.$instance === null) {
            this.$instance = new this(client)
        }
        return this.$instance;
    }

    constructor(client) {
        Object.defineProperty(this, 'client', { value: client });

        /**
         * This voice connection
         */
        this.voice = new Voice(client)

        /**
         * This player queue
         * @type {Queue}
         */
        this.queue = new Queue();
    }

    /**
     * Connect the bot to voice
     * @param {Discord.Message} msg
     * @param {Discord.VoiceChannel} channel
     * @returns {void}
     */
    async connect(msg, channel) {
        if (this.connection) return;
        const reply = await msg.reply(`connection en cours...`);
        this.connection = await this.voice.join(channel)
            .then(connection => {
                reply.edit(`${msg.author}, connecté au salon \`#${connection.channel.name}\`.`);
                return connection;
            })
            .catch(() => reply.edit(`${msg.author}, connectez-vous à un salon vocal d'abord.`));
        if (this.connection) this.connection.on('disconnect', () => this.destroy())
    }

    /**
     * Disconnect the bot from voice
     * @param {Discord.Message} msg
     * @returns {void}
     */
    async disconnect(msg) {
        if (!this.connection) return;
        const reply = await msg.channel.send(`déconnection...`);
        this.voice.leave(this.connection.channel)
            .then(() => reply.edit(`déconnecté.`))
            .catch(console.error);
    }

    /**
     * Destroy the voice connection
     * @returns {void}
     */
    destroy() {
        this.connection = null;
        this.status = player.OFF;
        this.dispatcher = null;
    }

    /**
     * Play a media or load it in the queue
     * @param {Discord.Message} msg
     * @param {Discord.VoiceChannel} channel
     * @param {string} query
     */
    async play(msg, channel, query) {
        const track = await this.askService(query);
        if (!track) return msg.reply(`cette ressource est introuvable.`)
        await this.connect(msg, channel);
        if (this.status === player.PLAYING) this.addToQueue(msg, track)
        else this.stream(msg, track);
    }

    /**
     * Stream a media
     * @param {Discord.Message} msg
     * @param {?YouTubeTrack} track
     */
    async stream(msg, track) {
        const stream = await track.getStream();
        if (!stream) {
            msg.channel.send(`Une erreur est survenue lors de la lecture de la piste.`);
            return this.next(msg)
        }
        stream.on('error', () => {
            msg.channel.send(`Une erreur est survenue lors de la lecture de la piste.`)
            return this.next(msg);
        });
        stream.on('end', () => this.next(msg));
        this.dispatcher = await this.voice.play(this.connection, stream)
            .then(dispatcher => {
                this.status = player.PLAYING;
                msg.channel.send(`\`${track.title}\``);
                return dispatcher;
            })
            .catch(console.error);
    }

    /**
     * Play next media in queue
     * @param {Discord.Message} msg
     */
    async next(msg) {
        if (this.queue.length > 0) return this.stream(msg, this.queue.next());
        msg.channel.send(`la liste de lecture est vide.`);
        return this.disconnect(msg);
    }

    /**
     * Pause the player
     * @param {Discord.Message} msg
     * @returns {Discord.Message}
     */
    async pause(msg) {
        if (this.status === player.OFF) return msg.reply(`je ne joue pas de musique pour l'instant.`);
        if (this.status === player.PAUSED) return msg.reply(`le lecteur est déjà en pause.`);
        await this.voice.pause(this.dispatcher);
        this.status = player.PAUSED;
        return msg.reply(`le lecteur est été mis en pause.`);
    }

    /**
     * Resume the player
     * @param {Discord.Message} msg
     * @returns {Discord.Message}
     */
    async resume(msg) {
        if (this.status === player.OFF) return msg.reply(`je ne joue pas de musique pour l'instant.`);
        if (this.status === player.PLAYING) return msg.reply(`le lecteur est déjà en cours.`);
        await this.voice.resume(this.dispatcher);
        this.status = player.PLAYING;
        return msg.reply(`le lecteur a redémarré.`);
    }

    /**
     * Stop the player
     * @param {Discord.Message} msg
     */
    async stop(msg) {
        this.emptyQueue(msg);
        if (this.status === player.PLAYING || this.status === player.PAUSED) this.disconnect(msg);
    }

    /**
     * Vers un PlayerDispatcher !?
     */
    /**
     * Select the media provider service to use and if not necessary, directly returns the track
     * @param {*} query
     */
    async askService(query) {
        if (query instanceof MessageEmbed && query.provider.name === 'YouTube') return new EmbedTrack(await query);
        else if (typeof query === 'string') return await YouTubeService.video(query);
        return null;
    }

    /**
     * Display the queue
     * @param {Discord.Message} msg
     */
    async displayQueue(msg) {
        return (this.queue.length > 0)
            ?
            msg.channel.send(`\`-\` \`${this.queue.map(track => track.title).join("\`\n\`-\` \`")}\``)
            :
            msg.channel.send(`la liste de lecture est vide.`);
    }

    /**
     * Push track to the queue
     * @param {Discord.Message} msg
     */
    async addToQueue(msg, track) {
        await this.queue.add(track)
        return msg.reply(`\`${track.title}\` a été ajouté à la liste de lecture.`);
    }

    /**
     * Empty the queue
     * @param {Discord.Message} msg
     */
    async emptyQueue(msg) {
        await this.queue.empty();
        return msg.reply(`la liste de lecture a été supprimée.`)
    }

    /**
     * Shuffle the queue
     * @param {Discord.Message} msg
     */
    async shuffleQueue(msg) {
        await this.queue.shuffle()
        return msg.reply(`la liste de lecture a été mélangée.`)
    }
}

module.exports = Player;
