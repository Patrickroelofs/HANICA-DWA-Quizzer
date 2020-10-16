import { WEBSOCKET_OPEN } from './../actions/sessionActions'

export default function (state = null, action) {
    switch (action.type) {
        case WEBSOCKET_OPEN: {
            return {state = action.payload}
        }

        default: 
            return state
    }
}