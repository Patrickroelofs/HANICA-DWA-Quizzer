const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

require('../models/quiz')
const {MasterMessage} = require("../functions/websocket");
const Quiz = mongoose.model('Quiz')

router.post('/', async function (req, res, next) {
    try {
        req.session.scoreboard = true
        req.session.roomCode = req.body.roomCode

        await Quiz.findOneAndUpdate(
            { roomCode: req.body.roomCode },
            {
                scoreboard: true
            }
        )
        req.session.joined = true
        //MasterMessage(req, 'SCOREBOARD_JOINED')

        res.send('SCOREBOARD Joined')

    } catch (err) {
        next(err)
    }
})

module.exports = router
