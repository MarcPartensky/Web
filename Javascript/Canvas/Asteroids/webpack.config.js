const path = require('path');

module.exports = {
    entry: 'models/client.js',
        output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'my-first-webpack.bundle.js'
    }
};