const mongoose = require('mongoose')

const teamSchema = mongoose.Schema({
    name: String,
    roundPoints: Number,
    roundScore: Number,
    answer: [String]
})

const Teams = mongoose.model('Teams', teamSchema)

module.exports = teamSchema