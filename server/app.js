const session = require('express-session')
const express = require('express')
const mongoose = require('mongoose')
const WebSocket = require('ws')
const db = mongoose.connection
const cors = require('cors')
const http = require('http')
const bodyParser = require('body-parser')
const {MasterMessage} = require("./functions/websocket");
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
        webSocketServer.handleUpgrade(req, networkSocket, head, newWebSocket => {
            webSocketServer.emit('connection', newWebSocket, req)
        })
    })
})

webSocketServer.on('connection', (socket, req) => {
    socket.session = req.session
    if(socket.session.scoreboard && socket.session.joined){
        MasterMessage(webSocketServer.clients, socket, 'SCOREBOARD_JOINED')
    }
    if(socket.session.team && socket.session.joined){
        TeamsMessage(webSocketServer.clients,socket, "TEAM_JOINED")
        MasterMessage(webSocketServer.clients, socket, "TEAM_JOINED")
        ScoreboardMessage(webSocketServer.clients, socket, "TEAM_JOINED")
    }
    socket.on('message', (message) => {
        message = JSON.parse(message)
        console.log(message)
        switch (message.type){
            case 'START_QUIZ':
                TeamsMessage(webSocketServer.clients, socket, 'START_QUIZ', message.roundNumber)
                ScoreboardMessage(webSocketServer.clients, socket, 'START_QUIZ', message.roundNumber)
                break;
            }


    })

    socket.on('close', (message) => {
        if(socket.session.master === true) {
            TeamsMessage(webSocketServer.clients, socket, 'DISCONNECTED_MASTER_LEFT')
            ScoreboardMessage(webSocketServer.clients, socket, 'DISCONNECTED_MASTER_LEFT')

        }
    })

})

// Setup routers
const scoreboardRouter = require('./routes/scoreboard')
const questionsRouter = require('./routes/questions')
const globalRouter = require('./routes/globals')
const teamsRouter = require('./routes/teams')
const quizRouter = require('./routes/quiz')
const roundRouter = require('./routes/rounds')
const {TeamMessage} = require("./functions/websocket");
const {ScoreboardMessage} = require("./functions/websocket");
const {TeamsMessage} = require("./functions/websocket");

app.use('/scoreboard', scoreboardRouter)
app.use('/questions', questionsRouter)
app.use('/globals', globalRouter)
app.use('/teams', teamsRouter)
app.use('/quiz', quizRouter)
app.use('/round', roundRouter)


httpServer.listen(3001, function () {
    console.log('Server started...')
})
