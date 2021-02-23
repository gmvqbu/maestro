'use strict';

const { Collection } = require("discord.js");

class BaseManager {

    /**
     * The collection this manager manages
     * @type {Collection<string, *>}
     */
    collection = new Collection();

    constructor(client, registry) {
        Object.defineProperty(this, 'client', { value: client });
        Object.defineProperty(this, 'registry', { value: registry });
    }

    /**
     * Register all the values in the collection
     * @param {Array<Object>} types
     * @returns {Registry}
     */
    register(values) {
        if (!Array.isArray(values)) throw Error(`Registry list must be an array.`);
        values.forEach((v, k) => {
            const entry = this.verify(v, k);
            if (!entry.key ||!entry.value) throw Error(`Verify method must return an object with 'key' and 'value' attributes.`);
            this.set(entry.key, entry.value);
        })
        return this.registry;
    }

    /**
     * Verify any value
     * This method is implemented by the children classes which define the real verification
     * They also define right the entry to return according to their collection format
     * @param {*} v
     * @param {string} k
     * @return {Object}
     */
    verify(v, k) {
        return {
            key: k,
            value: v
        };
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
     * @return {*}
     */
    get(key) {
        return this.collection.has(key) ? this.collection.get(key) : null;
    }

    /**
     * Browse the collection for any keyword conflict
     * @param {Array<string>|string} keywords
     * @returns {null}
     */
    browseCollectionForConflict(keywords) {
        keywords = !Array.isArray(keywords) ? Array.from(keywords) : keywords;
        keywords.forEach(keyword => {
            // If the manager can fetch any value from those keywords using the getter (or his implementation), there is a conflict.
            if (this.get(keyword)) throw Error(`Keyword ${keyword} is already registered.`);
        });
        return null;
    }
}

module.exports = BaseManager;
