/**
 * * Message (MASTER)
 * ? checks if client is a master
 * ? checks if roomcode is correct
 *
 * @param req the current sessions
 * @param message the message that get sent to the master client
 */
MasterMessage = function (req, message) {
    req.webSocketServer.clients.forEach((client) => {
        if (
            client.session.master &&
            req.session.roomCode === client.session.roomCode
        ) {
            console.log('message:', message, ' | TO: MASTER')

            client.send(
                JSON.stringify({
                    type: message,
                    roomCode: client.session.roomCode
                })
            )
        }
    })
}

/**
 * * Message (TEAMS)
 * ? Checks if client is a team
 * ? Checks if roomcode is correct
 *
 * @param req the current sessions
 * @param message the message that gets sent to the team client
 */
TeamsMessage = function (req, message) {
    req.webSocketServer.clients.forEach((client) => {
        if (
            client.session.team &&
            req.session.roomCode === client.session.roomCode
        ) {
            console.log('message:', message, ' | TO: ALL TEAMS')

            client.send(
                JSON.stringify({
                    type: message,
                    roomCode: client.session.roomCode
                })
            )
        }
    })
}

/**
 * * Message (TEAM)
 * ? Checks if client is a team
 * ? Checks if roomcode is correct
 * ? Checks if client name is correct
 *
 * @param req the current sessions
 * @param message the message that gets sent to the team client
 * @param teamName the teamname that the message needs to be sent to
 */
TeamMessage = function (req, message, teamName) {
    req.webSocketServer.clients.forEach((client) => {
        if (
            client.session.team &&
            client.session.teamName === teamName &&
            req.session.roomCode === client.session.roomCode
        ) {
            console.log('message:', message, ' | TO: ' + teamName)

            client.send(
                JSON.stringify({
                    type: message,
                    teamName: teamName,
                    roomCode: client.session.roomCode
                })
            )
        }
    })
}

/**
 * * Message (SCOREBOARD)
 * ? checks if client is a scoreboard
 * ? checks if roomcode is correct
 *
 * @param req the current sessions
 * @param message the message that gets sent to the scoreboard client
 */
ScoreboardMessage = function (req, message) {
    req.webSocketServer.clients.forEach((client) => {
        if (
            client.session.scoreboard &&
            req.session.roomCode === client.session.roomCode
        ) {
            console.log('message:', message, ' | TO: SCOREBOARD')

            client.send(
                JSON.stringify({
                    type: message,
                    roomCode: client.session.roomCode
                })
            )
        }
    })
}

module.exports = {
    ScoreboardMessage,
    MasterMessage,
    TeamsMessage,
    TeamMessage,
}
