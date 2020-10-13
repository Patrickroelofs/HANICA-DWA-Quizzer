const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

require('../models/quiz')
const Quiz = mongoose.model('Quiz')

router.post('/:name', async function (req, res, next) {
    try {
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