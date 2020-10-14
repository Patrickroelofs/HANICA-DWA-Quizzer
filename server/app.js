const session = require('express-session')
const express = require('express')
const mongoose = require('mongoose')
const WebSocket = require('ws')
const db = mongoose.connection
const cors = require('cors')
const http = require('http')
const bodyParser = require('body-parser')

// Setup server
const app = express()

app.use(cors({ origin: true, credentials: true }))
app.options('*', cors({ origin: true, credentials: true }))

app.use(bodyParser.json())

const sessionParser = session({
    saveUninitialized: false,
    secret: 'pizza',
    resave: false,
    cookie: {
        expires: new Date(Date.now() + 24 * 60 * 60 * 60 * 1000)
    }
})

app.use(sessionParser)

// Connect to mongoDB server
mongoose
    .connect('mongodb://localhost:27017/quizzer', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .catch((err) => {
        console.log(err)
        db.close()
    })

// Ensure all responses are Application/JSON
app.use(function (req, res, next) {
    res.setHeader('Content-Type', 'Application/JSON')

    next()
})

app.use('/', async function(req, res, next) {
    req.webSocketServer = webSocketServer
    next()
})

const httpServer = http.createServer(app)
const webSocketServer = new WebSocket.Server({noServer: true})

httpServer.on('upgrade', (req, networkSocket, head) => {
    sessionParser(req, {}, () => {
        
        // * Not working right now, needs input field on client side
        // if(req.session.roomCode === undefined) {
        //     console.log("No roomCode ", req.session)
        //     networkSocket.destroy()
        //     return
        // }


        webSocketServer.handleUpgrade(req, networkSocket, head, newWebSocket => {
            console.log("Socket Upgrade")
            webSocketServer.emit('connection', newWebSocket, req)
        })
    })
})

webSocketServer.on('connection', (socket, req) => {
    console.log('Websocket Connected & Session Saved')
    socket.session = req.session
})

// Setup routers
const scoreboardRouter = require('./routes/scoreboard')
const questionsRouter = require('./routes/questions')
const globalRouter = require('./routes/globals')
const teamsRouter = require('./routes/teams')
const quizRouter = require('./routes/quiz')

app.use('/scoreboard', scoreboardRouter)
app.use('/questions', questionsRouter)
app.use('/globals', globalRouter)
app.use('/teams', teamsRouter)
app.use('/quiz', quizRouter)


httpServer.listen(3001, function () {
    console.log('Server started...')
})
