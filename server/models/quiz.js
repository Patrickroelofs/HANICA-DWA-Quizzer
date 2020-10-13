const mongoose = require('mongoose')

const quizSchema = mongoose.Schema({
    roomCode: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: false,
    },
    teams: [
        {
            name: String,
            roundPoints: Number,
            roundScore: Number,
            answer: [String],
        },
    ],
    started: {
        type: Boolean,
        required: false,
    },
    round: {
        type: Number,
        required: false,
    },
    savedQuestions: [
        {
            type: String,
            required: false,
        },
    ],
    currentQuestion: [
        {
            type: String,
            required: false,
        },
    ],
    questionsAsked: [
        {
            type: String,
            required: false,
        },
    ],
})

const Quiz = mongoose.model('Quiz', quizSchema)

module.exports = quizSchema
