const express = require('express')
const mongoose = require('mongoose')
const _ = require('lodash')
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
        let roomCodeGenerated = makeRoomCode();

        req.session.master      = true
        req.session.roomCode    = roomCodeGenerated
        req.session.language    = req.body.language
        
        const quiz = await Quiz.create({
            roomCode: roomCodeGenerated,
            language: req.body.language
        })

        res.send(quiz)
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

router.patch('/:roundNumber/close/:questionNumber', async function (req, res, next) {
    try {
        const quiz = await Quiz.findOne({roomCode: req.session.roomCode})
        .then(room => {
            room.rounds.forEach(r => {
                if(r.roundNumber.toString() === req.params.roundNumber.toString()) {
                    r.round.forEach(a => {
                        if(a.questionNumber.toString() === req.params.questionNumber.toString()) {
                            a.closed = true
                        }
                    })
                }
            })
            
            room.save();
            res.send({close: 'closed'})

            TeamsMessage(req.webSocketServer.clients, req, 'QUESTION_CLOSED')
            ScoreboardMessage(req.webSocketServer.clients, req, 'QUESTION_CLOSED')
        });
    } catch (e) {
        next (e)
    }
})

router.delete('/:roomCode', async function(req, res, next) {
    try {
        await Quiz.deleteOne({roomCode: req.params.roomCode})

        req.session.destroy()

        res.send({deleted: true})

    } catch (e) {
        next (e)
    }
})

router.patch('/:roomCode/scores', async function(req, res, next) {
    try {
        await Quiz.findOne({roomCode: req.params.roomCode})
        .then(room => {
            // so well ranked[0] is the highest scoring team but maybe ranked[1] has the same score...
            let ranked = []
            room.teams.forEach(t => {
               ranked.push(t.roundScore)
            })
            ranked = _.uniq(ranked.sort(function (a, b) {return b - a}))
            room.teams.forEach(t => {
                if(t.roundScore === ranked[0]){
                    t.roundPoints = t.roundPoints + 4
                    t.roundScore = 0
                }else if(t.roundScore === ranked[1]){
                    t.roundPoints = t.roundPoints + 2
                    t.roundScore = 0
                }else if(t.roundScore === ranked[2]){
                    t.roundPoints = t.roundPoints + 1
                    t.roundScore = 0
                }else{
                    t.roundPoints = t.roundPoints + 0.1
                    t.roundScore = 0
                }
            })
            room.save()
        })

        res.send({scores: true})
    } catch (e) {
        next(e)
    }
})

module.exports = router
