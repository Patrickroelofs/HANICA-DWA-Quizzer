const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const { makeRoomCode } = require('../functions/quiz')

require('../models/quiz')
const Quiz = mongoose.model('Quiz')

router.get('/:roomCode', async function (req, res, next) {
    try {
        const quiz = await Quiz.findOne({ roomCode: req.params.roomCode })

        res.send(quiz)

    } catch (err) {
        next(err)
    }
})

router.post('/', async function (req, res, next) {
    try {
        const quiz = await Quiz.create({
            roomCode: makeRoomCode(),
        })

        res.send(quiz)
    } catch (err) {
        next(err)
    }
})

module.exports = router
