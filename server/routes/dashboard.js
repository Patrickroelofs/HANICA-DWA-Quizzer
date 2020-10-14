const express = require('express')
const router = express.Router()

router.post('/', async function (req, res, next) {
    try {
        req.session.dashboard = true
        req.session.roomCode = req.body.roomCode

        MasterMessage(req, 'DASHBOARD_JOINED')

        res.send('Dashboard Joined')
    } catch (err) {
        next(err)
    }
})

module.exports = router
