const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const {
    MasterMessage,
    ScoreboardMessage,
    TeamsMessage,
    TeamMessage,
} = require('../functions/websocket')

mongoose.set('useFindAndModify', false)

require('../models/quiz')
const Quiz = mongoose.model('Quiz')

router.post('/:name', async function (req, res, next) {
    try {
        req.session.team = true
        req.session.teamName = req.params.name
        req.session.roomCode = req.body.roomCode

        const team = await Quiz.findOneAndUpdate(
            { roomCode: req.body.roomCode },
            {
                $push: {
                    teams: [
                        {
                            name: req.params.name,
                            roundPoints: 0,
                            roundScore: 0,
                            answer: [],
                        },
                    ],
                },
            }
        )
        // Send Websocket messages to:
        TeamsMessage(req, 'TEAM_JOINED')
        MasterMessage(req, 'TEAM_JOINED')
        ScoreboardMessage(req, 'TEAM_JOINED')

        res.send(team)

        console.log(`[POST] teams.post(${req.params.name})`)
        console.log(req.session)
    } catch (err) {
        next(err)
    }
})

router.get('/:roomCode', async function (req, res, next) {
    try {
        const quiz = await Quiz.find({ roomCode: req.params.roomCode })

        const stringifiedQuiz = JSON.stringify(quiz)
        const parsedQuiz = JSON.parse(stringifiedQuiz)

        res.send(parsedQuiz[0].teams)
        console.log(`[GET] teams.get('/${req.params.roomCode}'`)
    } catch (err) {
        next(err)
    }
})

router.delete('/:name', async function (req, res, next) {
    try {
        await Quiz.updateOne(
            { roomCode: req.session.roomCode },
            { $pull: { teams: { name: req.params.name } } }
        )

        TeamMessage(req, 'TEAM_REFUSED', req.params.name)

        res.send(
            JSON.stringify({
                type: 'TEAM_DELETED',
                message: `${req.params.name}`,
                roomCode: req.session.roomCode,
            })
        )

        console.log(`[DELETE] teams.delete(${req.params.name})`)
        console.log(req.session)
    } catch (err) {
        next(err)
    }
})

module.exports = router
