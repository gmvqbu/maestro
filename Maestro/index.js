'use strict';

module.exports = {
    // Core
    Client: require('./src/client'),
    Dispatcher: require('./src/dispatcher'),
    Registry: require('./src/registry'),
    Config: require('./src/Config/Config'),
    Message: require('./src/Message/Message'),

    // Tools
    User: require('./infrastructure/User/User')
}
