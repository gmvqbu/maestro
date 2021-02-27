'use strict';

const BaseType = require('../types/ArgumentType');
const BaseManager = require("./BaseManager");

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
        if (!BaseType.prototype.isPrototypeOf(type.prototype)) throw Error(`The provided type must be an object extending BaseType.`);
        type = new type(this.client);
        this.browseCollectionForConflict(type.id);
        return {
            key: type.id,
            value: type
        }
    }
}

module.exports = TypeManager;
