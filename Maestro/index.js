'use strict';

module.exports = {
    // Core
    Client: require('./src/core/client'),
    Dispatcher: require('./src/core/dispatcher'),
    Registry: require('./src/core/registry'),

    // Config
    Config: require('./src/tools/config/ConfigService'),

    // Tools
    User: require('./src/tools/User/UserService')
}
