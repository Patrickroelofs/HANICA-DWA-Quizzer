const mongoose = require('mongoose')

const roundSchema = mongoose.Schema({
    roundNumber: {
        type: Number,
    },
    categories: [{
        type: String,
    }],
    round: [{
        closed: {
            type: Boolean,
            default: false,
        },
        questionNumber: {
            type: Number
        },
        question: {
            type: String,
        },
        answer: { // this is the answer to the question :)
            type: String,
        },
        category: {
            type: String
        },
        answers: [{
            review: {
                type: Boolean
            },
            answer: {
                type: String
            },
            team: {
                type: String,
            }
        }],
    }],
})

module.exports = roundSchema