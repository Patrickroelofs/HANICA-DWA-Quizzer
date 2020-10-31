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

        await Quiz.findOne({ roomCode: req.body.roomCode }).then(room => {
            if(room !== null) {
                if (room.started) {
                    res.send({worked: false, message: 'This room already started'})
                } else {
                    room.scoreboard = true
                    req.session.joined = true
                    res.send({worked: true, language: room.language})
                }
                room.save()
            }
            else{
                res.send({worked: false, message: 'This room does not exist'})
            }
        })

    } catch (err) {
        next(err)
    }
})

module.exports = router
