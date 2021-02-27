'use strict';

const { Collection } = require("discord.js");

/** Represent a base collection manager */
class BaseManager {

    /**
     * The collection this manager manages
     * @type {Collection<string, *>}
     */
    collection = new Collection();

    constructor(client, registry) {
        if (!client) throw new Error(`Manager client must be specified.`);
        if (!registry) throw new Error(`Manager registry must be specified.`);

        /**
		 * Client that this manager is for
		 * @name ThisType#client
		 * @type {MaestroClient}
		 * @readonly
		 */
        Object.defineProperty(this, 'client', { value: client });

        /**
		 * Registry that this manager is for
		 * @name ThisType#registry
		 * @type {Registry}
		 * @readonly
		 */
        Object.defineProperty(this, 'registry', { value: registry });
    }

    /**
     * Register all the values in the collection
     * @param {Array<*>} values The values to register in the collection
     * @returns {Registry} Useful to make method chains
     */
    register(values) {
        if (!Array.isArray(values)) throw Error(`Registry list must be an array.`);
        values.forEach((v, k) => {
            const entry = this.verify(v, k);
            if (!entry.key) throw Error(`Entry key cannot be null.`);
            if (!entry.value) throw Error(`Entry value cannot be null.`);
            this.set(entry.key, entry.value);
        })
        return this.registry;
    }

    /**
     * Verify any value
     * This method is implemented by the children classes which define the real verification
     * They also define the entry to return according to their collection format
     * @param {*} v
     * @param {string} k
     * @returns {Object}
     */
    verify(v, k) {
        return { key: k, value: v };
    }

    /**
     * Set an entry in this collection
     * @param {string} key
     * @param {*} value
     */
    set(key, value) {
        this.collection.set(key, value);
    }

    /**
     * Get an entry from this collection
     * @param {string} key
     * @returns {*}
     */
    get(key) {
        return this.collection.has(key) ? this.collection.get(key) : null;
    }

    /**
     * Wetehr the collection has
     * @param {*} key
     */
    has(key) {
        return this.collection.has(key);
    }

    /**
     * Browse the collection for any keyword conflict
     * @param {Array<string>|string} keywords
     * @returns {null}
     */
    browseCollectionForConflict(keywords) {
        if (typeof keywords != 'string' && !Array.isArray(keywords)) throw Error(`Keywords must be a string (single value) or an array (multiple values).`);
        keywords = !Array.isArray(keywords) ? Array.from(keywords) : keywords;
        keywords.forEach(keyword => {
            // If the manager can fetch any value from those keywords using the getter (or his implementation), there is a conflict.
            if (this.get(keyword)) throw Error(`Keyword ${keyword} is already registered.`);
        });
        return null;
    }
}

module.exports = BaseManager;
