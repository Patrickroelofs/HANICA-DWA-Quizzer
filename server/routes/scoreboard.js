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
            if(room.started){
                res.send({worked: false})
            }else{
                room.scoreboard = true
                req.session.joined = true
                res.send({worked: true, language: room.language})
            }
            room.save()
        })

    } catch (err) {
        next(err)
    }
})

module.exports = router
