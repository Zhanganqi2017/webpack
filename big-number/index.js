if (process.env.NODE_ENV == 'production') {
    modelu.exports = require('./dist/large-number.min.js');
} else {
    modelu.exports = require('./dist/large-number.js')
}