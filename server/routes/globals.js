const express = require('express')
const router = express.Router()

router.delete('/session', async function (req, res, next) {
    try {
        console.log("Session being destroyed:")
        console.log(req.session)
        req.session.destroy()
        console.log("Session destroyed:")
        console.log(req.session)

        res.send("Session Destroyed")

    } catch (err) {
        next(err)
    }
})

module.exports = router