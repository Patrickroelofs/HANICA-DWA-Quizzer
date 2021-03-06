const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()


mongoose.set("useFindAndModify", false)

require("../models/quiz")
const {TeamsMessage, TeamMessage} = require("../functions/websocket");
const {MasterMessage} = require("../functions/websocket");
const {ScoreboardMessage} = require("../functions/websocket");
const Quiz = mongoose.model("Quiz")

router.patch('/:roundNumber/question/:questionNumber',async function(req, res, next){

    await Quiz.findOne({roomCode: req.session.roomCode})
    .then(room => {
        room.rounds.forEach(r => {
            if(r.roundNumber.toString() === req.params.roundNumber.toString()) {
                if(req.params.questionNumber.toString() === '0') {
                    r.round.push({question: req.body.question, answer: req.body.answer, category: req.body.category, questionNumber: 1})
                } else {
                    r.round.push({question: req.body.question, answer: req.body.answer, questionNumber: Number(req.params.questionNumber) + 1})
                }
            }
        })

        room.save()

        TeamsMessage(req.webSocketServer.clients, req, 'NEW_QUESTION')
        ScoreboardMessage(req.webSocketServer.clients, req, 'NEW_QUESTION')
    })

    res.send({thing :'got there good job'})
})

router.get('/:roundNumber/question/:questionNumber', async function(req, res, next) {

    await Quiz.findOne({roomCode: req.session.roomCode})
    .then(room => {
        room.rounds.forEach(r => {
            if(r.roundNumber.toString() === req.params.roundNumber.toString()) {
                r.round.forEach(a => {
                    if(a.questionNumber.toString() === req.params.questionNumber.toString()) {
                        res.send(JSON.stringify({question: a.question, answer: a.answer, category: a.category}))
                    }
                })
            }
        })
    })
})

router.patch('/:roundNumber/answer/:questionNumber', async function(req, res, next) {
    const quiz = await Quiz.findOne({roomCode: req.session.roomCode})
    .then(room => {
        room.rounds.forEach(r => {
            if(r.roundNumber.toString() === req.params.roundNumber.toString()) {
                r.round.forEach(a => {
                    if(a.answers.filter(b => b.team.toString() === req.session.teamName.toString()).length > 0) {
                        a.answers.forEach(c => {
                            if(a.questionNumber.toString() === req.params.questionNumber.toString()) {
                                if(c.team.toString() === req.session.teamName.toString()) {
                                    req.body.answer
                                    c.answer = req.body.answer
                                    c.review = undefined
                                }
                            }
                        })
                    } else {
                        a.answers.push({answer: req.body.answer, team: req.session.teamName})
                    }
                })
            }
        })
        room.save();
    });

    ScoreboardMessage(req.webSocketServer.clients, req, "ANSWER")
    MasterMessage(req.webSocketServer.clients, req, "ANSWER")
    res.send({thing :'got there good job'})
})

router.get('/:roundNumber/answer/:questionNumber', async function(req, res, next) {
    const quiz = await Quiz.findOne({roomCode: req.session.roomCode})
    .then(room => {
        room.rounds.forEach(r => {
            if(r.roundNumber.toString() === req.params.roundNumber.toString()) {
                r.round.forEach(a => {
                    if(a.questionNumber.toString() === req.params.questionNumber.toString()) {
                        res.send(a.answers)
                    }
                })
            }
        })
    })
})

router.patch('/:roundNumber/review/:questionNumber', async function(req, res, next) {
    req.body.reviews.forEach(team =>{
        Quiz.findOne({roomCode: req.session.roomCode})
            .then(room => {
                room.rounds.forEach(r => {
                    if(r.roundNumber.toString() === req.params.roundNumber.toString()) {
                        r.round.forEach(a => {
                            a.answers.forEach(b => {
                                if(b.team.toString() === team.name.toString()) {
                                    b.review = team.review
                                }
                            })
                        })
                    }
                })

                return room

            }).then(room => {
                room.teams.forEach(r => {
                    if(r.name.toString() === team.name.toString() && team.review) {
                        r.roundScore = r.roundScore + 1;
                    }
                })

                room.save()
            })
    })


    ScoreboardMessage(req.webSocketServer.clients, req, "ANSWER_REVIEWED")
    res.send()
})


module.exports = router
