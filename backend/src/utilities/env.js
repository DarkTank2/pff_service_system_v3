const credentials = require('./credentials.json')

function getDBCredentials () {
    return credentials
}

module.exports = {
    dbCredentials: getDBCredentials
}