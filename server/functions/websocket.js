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
TeamsMessage = function (req, message, teamName) {
    req.webSocketServer.clients.forEach((client) => {
        if (
            client.session.teams &&
            req.session.teamName === teamName &&
            req.session.roomCode === client.session.roomCode
        ) {
            console.log('message:', message, ' | TO: ' + teamName)

            client.send(
                JSON.stringify({
                    type: message,
                })
            )
        }
    })
}

/**
 * * Message (DASHBOARD)
 * ? checks if client is a dashboard
 * ? checks if roomcode is correct
 *
 * @param req the current sessions
 * @param message the message that gets sent to the dashboard client
 */
DashboardMessage = function (req, message) {
    req.webSocketServer.clients.forEach((client) => {
        if (
            client.session.dashboard &&
            req.session.roomCode === client.session.roomCode
        ) {
            console.log('message:', message, ' | TO: DASHBOARD')

            client.send(
                JSON.stringify({
                    type: message,
                })
            )
        }
    })
}

module.exports = {
    MasterMessage,
    TeamsMessage,
    DashboardMessage,
}
