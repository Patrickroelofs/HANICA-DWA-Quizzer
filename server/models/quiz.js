const mongoose = require('mongoose')

const teamSchema = require('./teams')

const quizSchema = mongoose.Schema({
    language: {
        type: String,
        required: true,
    },
    teams: [teamSchema],
    started: {
        type: Boolean,
        required: true,
    },
    round: {
        type: Number,
        required: true,
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
