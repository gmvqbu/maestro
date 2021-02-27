'use strict';

const ArgumentType = require('../../argumentTypes/base.js');
const BaseManager = require("./base");

/**
 * Represent the Type Collection manager
 * @extends BaseManager
 */
class TypeManager extends BaseManager {
    /**
     * Verify any type
     * @param {Function|Object} type The type to verify
     * @returns {Object}
     */
    verify(type) {
        if (!ArgumentType.prototype.isPrototypeOf(type.prototype)) throw Error(`The provided type must extends ArgumentType.`);
        type = new type(this.client);
        this.browseCollectionForConflict(type.id);
        return {
            key: type.id,
            value: type
        }
    }
}

module.exports = TypeManager;
