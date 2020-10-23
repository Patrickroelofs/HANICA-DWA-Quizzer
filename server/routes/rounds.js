const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()


mongoose.set("useFindAndModify", false)

require("../models/quiz")
const Quiz = mongoose.model("Quiz")

router.patch('/:roundNumber/question',async function(req, res, next){
    const quiz = await Quiz.findOneAndUpdate({roomCode: req.session.roomCode, "rounds.roundNumber" : req.params.roundNumber}, {$set :{
            'rounds.$.round.question' : req.body.question,
            'rounds.$.round.answer' : req.body.answer,
        },
        $inc : {'rounds.$.round.questionNumber' : 1}})
    res.send({thing :'got there good job'})
})

router.get('/:roundNumber/question', async function(req, res, next){
    const questions = await Quiz.findOne({roomCode: req.session.roomCode, "rounds.roundNumber" : req.params.roundNumber}, { "rounds" : {$elemMatch: {"roundNumber" : req.params.roundNumber}} })
    console.log(questions)
    res.send({question : questions.rounds[0].round.question})
})

router.patch('/:roundNumber/answer', async function(req, res, next){
    const quiz = await Quiz.findOneAndUpdate({roomCode: req.session.roomCode, "rounds.roundNumber" : req.params.roundNumber}, {$set :{
            'rounds.$.round.question' : req.body.question,
            'rounds.$.round.answer' : req.body.answer,
        },
        $inc : {'rounds.$.round.questionNumber' : 1}})
})

module.exports = router
