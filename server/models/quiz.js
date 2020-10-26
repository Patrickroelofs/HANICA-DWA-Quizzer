const mongoose = require('mongoose')

const Rounds = require('./rounds')

const quizSchema = mongoose.Schema({
    roomCode: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: false,
    },
    scoreboard: {
        type: Boolean
    },
    teams: [
        {
            name: String,
            roundPoints: Number,
            roundScore: Number,
            answer: {
                givenAnswer: String,
                review: Boolean,
            },
        },
    ],
    started: {
        type: Boolean,
        required: false,
    },
    rounds: [{
        type: Rounds
    }]
})

const Quiz = mongoose.model('Quiz', quizSchema)

module.exports = quizSchema
