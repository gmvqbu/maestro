'use strict';

const RegularExpressions = new Map(Object.entries({
    ID_PATTERN: new RegExp('^\\d+$'),
    COMMAND_PATTERN: prefix => new RegExp(`^\\${prefix}\\w+(\\s+)?(\\w+\\s+)?`, 'i'),
}));

module.exports = {
    RegularExpressions
}
