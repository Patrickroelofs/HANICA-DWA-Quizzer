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

const sessionParser = session({
    saveUninitialized: false,
    secret: 'pizza',
    resave: false,
    cookie: {
        expires: new Date(Date.now() + 24 * 60 * 60 * 60 * 1000)
    }
})

app.use(sessionParser)
app.use(bodyParser.json())

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

const httpServer = http.createServer()
const webSocketServer = new WebSocket.Server({noServer: true})

webSocketServer.on('connection', (socket, req) => {
    console.log('Websocket Connected & Session Saved')
    socket.session = req.session

    socket.on('message', (message) => {
        req.session.reload((err) => {
            if(err) { throw err }

            if(req.session.roomCode === undefined) {
                console.log(`Ignoring message from no-roomcode user ${message}`)
                return
            }
        })
    })
})

// !!! temporary server echo- of session
app.use(function (req, res, next) {
    console.log(req.session)

    next()
})

// Setup routers
const questionsRouter = require('./routes/questions')
const teamsRouter = require('./routes/teams')
const quizRouter = require('./routes/quiz')

app.use('/questions', questionsRouter)
app.use('/teams', teamsRouter)
app.use('/quiz', quizRouter)

httpServer.on('request', app)
httpServer.listen(3001, function () {
    console.log('Server started...')
})
