'use strict';

module.exports = {
    // Core
    Client: require('./src/client'),
    Dispatcher: require('./src/dispatcher'),
    Registry: require('./src/registry'),

    // Config
    Config: require('./src/Config/ConfigService'),

    // Tools
    User: require('./src/User/UserService')
}
