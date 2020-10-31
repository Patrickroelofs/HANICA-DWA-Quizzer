const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const Rounds = require('./rounds')
mongoose.set('useCreateIndex', true)

const quizSchema = mongoose.Schema({
    roomCode: {
        type: String,
        required: true,
        unique: true
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


quizSchema.plugin(uniqueValidator)
const Quiz = mongoose.model('Quiz', quizSchema)

module.exports = quizSchema
