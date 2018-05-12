const MongoClient = require('mongodb').MongoClient
const state = {
    db: null,
}

module.exports = {
    connect: (url, done) => {
        if (state.db) return done()

        MongoClient.connect(url, function(err, db) {
            if (err) return done(err)
            state.db = db
            done()
        })
    },

    connection: () => {
        return state.db
    },

    closeConnection: () => {
        if (state.db) {
            state.db.close((err, result) => {
                state.db = null
                return
            })
        }
    }
}
