const port = 3001
const server = `ws://${window.location.hostname}:${port}`

let wsConnection

export const WEBSOCKET_OPEN = 'WEBSOCKET_OPEN'

export function webSocket() {
    return (dispatch) => {
        if(wsConnection === undefined) {
            wsConnection = new WebSocket(server)
        }

        wsConnection.onmessage = (e) => {
            console.log('WEBSOCKET DATA: ', e.data)

            dispatch(JSON.parse(e.data))
        }

        wsConnection.onopen = (e) => {
            console.log('WEBSOCKET OPEN: ', e)
            dispatch({type: WEBSOCKET_OPEN, payload: wsConnection})
        }

        wsConnection.onclose = (e) => {
            console.log('WEBSOCKET CLOSED: ', e)
        }

        wsConnection.onerror = (e) => {
            console.log('WEBSOCKET ERROR: ', e)
        }
    }
}
