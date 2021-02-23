'use strict';

const { Collection } = require("discord.js");
const BaseType = require("../../types/type");
const BaseManager = require("./base");

class TypeManager extends BaseManager {

    /**
     * Verify any type before save
     * @param {Function|Object} type
     * @returns {Object}
     */
    verify(type) {
        if (!BaseType.prototype.isPrototypeOf(type.prototype)) throw Error(`The provided type must be an object extending BaseType.`);
        type = new type(this.client);
        this.browseCollectionForConflict(type.name);
        return {
            key: type.name,
            value: type
        }
    }

}

module.exports = TypeManager;
