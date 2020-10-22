const mongoose = require('mongoose')

const roundSchema = mongoose.Schema({
    roundNumber: {
        type: Number,
    },
    categories: [{
        type: String,
    }],
    round: {
        questionNumber: {
            type: Number,
        },
        question: {
            type: String,
        },
        answer: {
            type: String,
        },
        answers: [{
            answer: {
                type: String
            },
            team: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Teams'
            }
        }],
    },
})

module.exports = roundSchema