const session = require('express-session');
const express = require('express')
const mongoose = require('mongoose')
const ws = require('ws')
const db = mongoose.connection
const cors = require('cors')
const http = require('http')
const bodyParser = require('body-parser')

// Setup server
const app = express()

app.use(cors({ origin: 'http://localhost:3000/', credentials: true }))
app.options('http://localhost:3000/', cors({ origin: true, credentials: true }))

app.use(bodyParser.json())

const sessionParser = session({
    roomCode: '',
    language: '',
    saveUninitialized: false,
    secret: 'pizza',
    resave: false,
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

// Setup routers
const questionsRouter = require('./routes/questions')
app.use('/questions', questionsRouter)

// const teamsRouter = require('./routes/teams')
// app.use('/teams', teamsRouter)

const quizRouter = require('./routes/quiz')
app.use('/quiz', quizRouter)

const httpServer = http.createServer(app)
const wsServer = new ws.Server({ noServer: true })

httpServer.on('upgrade', (req, networkSocket, head) => {
  console.log('upgrade')
    sessionParser(req, {}, () => {
        if (req.session.roomCode === undefined) {
            console.log(`oh no... no roomcode error`)
            networkSocket.destroy()
            return
        }

        wsServer.handleUpgrade(req, networkSocket, head, (newWebSocket) => {
            wsServer.emit('connection', newWebSocket, req)
        })
    })
})

wsServer.on('connection', (socket, req) => {
  console.log('connection')
    socket.session = req.session
})

app.listen(3001, function () {
    console.log('server has started on http://localhost:3001')
})
