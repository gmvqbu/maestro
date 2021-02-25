'use strict';

const BaseType = require('../types/base');
const BaseManager = require("./BaseManager");

/**
 * Represent the Type Collection manager
 * @extends BaseManager
 */
class TypeManager extends BaseManager {
    /**
     * Register the default types
     * @returns {Registry}
     */
    registerDefaults() {
        return super.register([
            require('../types/string')
        ])
    }

    /**
     * Verify any type
     * @param {Function|Object} type The type to verify
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
