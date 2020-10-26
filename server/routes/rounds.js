const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()


mongoose.set("useFindAndModify", false)

require("../models/quiz")
const {TeamsMessage} = require("../functions/websocket");
const {MasterMessage} = require("../functions/websocket");
const {ScoreboardMessage} = require("../functions/websocket");
const Quiz = mongoose.model("Quiz")

router.patch('/:roundNumber/question',async function(req, res, next){
    const quiz = await Quiz.findOneAndUpdate({roomCode: req.session.roomCode, "rounds.roundNumber" : req.params.roundNumber}, {$set :{
            'rounds.$.round.question' : req.body.question,
            'rounds.$.round.answer' : req.body.answer,
        },
        $inc : {'rounds.$.round.questionNumber' : 1}})
    TeamsMessage(req.webSocketServer.clients, req, 'NEW_QUESTION')
    ScoreboardMessage(req.webSocketServer.clients, req, 'NEW_QUESTION')
    res.send({thing :'got there good job'})
})

router.get('/:roundNumber/question', async function(req, res, next){
    const questions = await Quiz.findOne({roomCode: req.session.roomCode, "rounds.roundNumber" : req.params.roundNumber}, { "rounds" : {$elemMatch: {"roundNumber" : req.params.roundNumber}} })
    console.log(questions)
    res.send({question : questions.rounds[0].round.question})
})

router.patch('/answer', async function(req, res, next){
    console.log('hi im trying')
    const quiz = await Quiz.findOneAndUpdate(
        {roomCode: req.session.roomCode, "teams.name" : req.session.teamName},
        {$set :{'teams.$.answer.givenAnswer' : req.body.answer,}}
        )
    ScoreboardMessage(req.webSocketServer.clients, req, "ANSWER")
    MasterMessage(req.webSocketServer.clients, req, "ANSWER")
    res.send({thing :'got there good job'})
})


module.exports = router
