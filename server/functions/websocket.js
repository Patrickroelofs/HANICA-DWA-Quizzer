/**
 * * Message (MASTER)
 * ? checks if client is a master
 * ? checks if roomcode is correct
 *
 * @param clients
 * @param socket
 * @param message the message that get sent to the master client
 * @param payload
 */
MasterMessage = function (clients,socket, message, payload) {
    clients.forEach((client) => {
        if (

            client.session.master &&
            socket.session.roomCode === client.session.roomCode
        ) {
            console.log('message:', message, ' | TO: MASTER')

            client.send(
                JSON.stringify({
                    type: message,
                    roomCode: client.session.roomCode,
                    payload: payload
                })
            )
            if(payload === 'DELETE'){
                client.close()
            }
        }
    })
}

/**
 * * Message (TEAMS)
 * ? Checks if client is a team
 * ? Checks if roomcode is correct
 *
 * @param clients
 * @param socket
 * @param message the message that gets sent to the team client
 * @param payload
 */
TeamsMessage = function (clients, socket, message, payload) {
    clients.forEach((client) => {
        if (
            client.session.team &&
            socket.session.roomCode === client.session.roomCode
        ) {
            console.log('message:', message, ' | TO: ALL TEAMS')
            client.send(
                JSON.stringify({
                    type: message,
                    payload: payload,
                    roomCode: client.session.roomCode
                })
            )
            if(payload === 'DELETE'){
                client.close()
            }
        }
    })
}

/**
 * * Message (TEAM)
 * ? Checks if client is a team
 * ? Checks if roomcode is correct
 * ? Checks if client name is correct
 *
 * @param clients
 * @param socket
 * @param message the message that gets sent to the team client
 * @param teamName the teamname that the message needs to be sent to
 */
TeamMessage = function (clients, socket , message, teamName) {

    clients.forEach((client) => {
        if (
            client.session.team &&
            client.session.teamName === teamName &&
            socket.session.roomCode === client.session.roomCode
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
 * @param clients
 * @param socket
 * @param message the message that gets sent to the scoreboard client
 */
ScoreboardMessage = function (clients, socket , message, payload) {
    clients.forEach((client) => {
        if (
            client.session.scoreboard &&
            socket.session.roomCode === client.session.roomCode
        ) {
            console.log('message:', message, ' | TO: SCOREBOARD')
            client.send(
                JSON.stringify({
                    type: message,
                    payload: payload,
                    roomCode: client.session.roomCode
                })
            )
            if(payload === 'DELETE'){
                client.close()
            }
        }
    })
}

module.exports = {
    ScoreboardMessage,
    MasterMessage,
    TeamsMessage,
    TeamMessage,
}
