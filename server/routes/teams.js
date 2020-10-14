const express = require('express')
const mongoose = require('mongoose')
const { MasterMessage } = require('../functions/websocket')
const router = express.Router()

mongoose.set('useFindAndModify', false);

require('../models/quiz')
const Quiz = mongoose.model('Quiz')

router.post('/:name', async function (req, res, next) {
    try {

        req.session.master = false
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

        MasterMessage(req, 'TEAM_JOINED')

        res.send(team)
    } catch (err) {
        next(err)
    }
})

router.get('/:name', async function (req, res, next) {
    try {
        // TODO: Doesnt work, needs sessions n stuff
        const team = await Quiz.findOne({ team: [{name: teamName}] })

        res.send(team)
    } catch (err) {
        next(err)
    }
})

module.exports = router