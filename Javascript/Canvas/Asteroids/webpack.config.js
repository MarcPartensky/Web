const path = require('path');

module.exports = {
    mode:  "development",
    watch:  'true',
    entry: './models/client.js',
        output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'client.bundle.js'
    }
};