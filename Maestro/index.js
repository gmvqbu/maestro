'use strict';

module.exports = {
    // Core
    Client: require('./src/client'),
    Dispatcher: require('./src/dispatcher'),
    Registry: require('./src/registry'),

    // Config
    Config: require('./src/Config/ConfigService'),

    // App
    Message: require('./src/Message/Message'),

    // Tools
    User: require('./infrastructure/User/UserService')
}
