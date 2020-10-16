const port = 3001
const server = `ws://${window.location.hostname}:${port}`

let wsConnection

export const WEBSOCKET_OPEN = 'WEBSOCKET_OPEN'

function websocket_open(websocket) {
    return {
        type: WEBSOCKET_OPEN,
        payload: websocket,
    }
}

export function webSocket() {

    return (dispatch) => {

        wsConnection = new WebSocket(server)

        wsConnection.onmessage = (e) => {
            console.log('WEBSOCKET DATA: ', e.data)

            dispatch(JSON.parse(e.data))
        }

        wsConnection.onopen = (e) => {
            console.log('WEBSOCKET OPEN: ', e)
            dispatch(websocket_open(wsConnection))
        }

        wsConnection.onclose = (e) => {
            console.log('WEBSOCKET CLOSED: ', e)
        }

        wsConnection.onerror = (e) => {
            console.log('WEBSOCKET ERROR: ', e)
        }
    }
}
