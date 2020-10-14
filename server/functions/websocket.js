MasterMessage = function (req, message) {
    req.websocketServer.clients.forEach((client) => {
        console.log('message:', message, ' | TO: MASTER')

        if (
            client.session.master &&
            req.session.roomCode === client.session.roomCode
        ) {
            client.send(
                JSON.stringify({
                    type: message,
                    roomCode: req.session.roomCode,
                })
            )
        }
    })
}

module.exports = { MasterMessage }
