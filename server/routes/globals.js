const express = require('express')
const router = express.Router()

router.delete('/session', async function (req, res, next) {
    try {
        req.session.destroy()

        res.send("Session Destroyed")

    } catch (err) {
        next(err)
    }
})

module.exports = router