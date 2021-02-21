'use strict';

class Argument {

    constructor(data) {

        this.key = 'key' in data ? data.key : null;
        if (!this.key) throw Error(`Argument key cannot be null`);
        if (typeof this.key != 'string') throw Error(`Argument key must be a string`);
        if (this.key != this.key.toLowerCase()) throw Error(`Argument key must be in lower case.`);
    }

}

module.exports = Argument;
