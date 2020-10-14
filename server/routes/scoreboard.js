const express = require('express')
const router = express.Router()

router.post('/', async function (req, res, next) {
    try {
        req.session.scoreboard = true
        req.session.roomCode = req.body.roomCode

        MasterMessage(req, 'SCOREBOARD_JOINED')

        res.send('SCOREBOARD Joined')
    } catch (err) {
        next(err)
    }
})

module.exports = router
