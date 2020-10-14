const express = require('express')
const mongoose = require('mongoose')
const { MasterMessage, ScoreboardMessage, TeamsMessage } = require('../functions/websocket')
const router = express.Router()

mongoose.set('useFindAndModify', false);

require('../models/quiz')
const Quiz = mongoose.model('Quiz')

router.post('/:name', async function (req, res, next) {
    try {

        req.session.team = true
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

module.exports = router