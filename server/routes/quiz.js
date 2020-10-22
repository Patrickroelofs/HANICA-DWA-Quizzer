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
        console.log(`[GET] quiz.get(${req.params.roomCode})`)
        console.log(req.session)
    } catch (err) {
        next(err)
    }
})

router.post('/', async function (req, res, next) {
    try {
        let roomCodeGenerated = makeRoomCode();

        req.session.master      = true
        req.session.roomCode    = roomCodeGenerated
        req.session.language    = req.body.language
        
        const quiz = await Quiz.create({
            roomCode: roomCodeGenerated,
            language: req.body.language
        })

        res.send(quiz)

        console.log(`[POST] quiz.post('/') : quiz created`)
        console.log(req.session)
    } catch (err) {
        next(err)
    }
})

router.post('/round', async function(req, res, next) {
    try {
        const quiz = await Quiz.findOneAndUpdate(
            { roomCode: req.body.roomCode },
            {
                $push: {
                    rounds: {
                        roundNumber: req.body.roundNumber,
                        categories: [
                            //TODO: Make this better :)
                            req.body.categories0,
                            req.body.categories1,
                            req.body.categories2,
                        ]
                    }
                }
            }
        )

        res.send(quiz)
    } catch (err) {
        next(err)
    }
})

module.exports = router
