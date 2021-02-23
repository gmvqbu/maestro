'use strict';

class BaseType {

    constructor(client, data) {
        Object.defineProperty(this, 'client', { value: client });

        this.name = 'name' in data ? data.name : null;
        if (!this.name) throw Error(`Type name cannot be null.`);
        if (typeof this.name != 'string') throw Error(`Type name must be a string.`);
        if (this.name != this.name.toLowerCase()) throw Error(`Type name must be in lower case.`);

    }

}

module.exports = BaseType;
