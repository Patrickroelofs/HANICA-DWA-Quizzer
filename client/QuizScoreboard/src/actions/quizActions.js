export const JOIN_QUIZ_SUCCESS = 'JOIN_QUIZ_SUCCESS'

function joinQuizSuccess(payload) {
    return {
        type: JOIN_QUIZ_SUCCESS,
        payload: payload,
    }
}

export function joinQuiz(roomCode) {
    return (dispatch) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify({ roomCode: roomCode }),
        }

        fetch('http://localhost:3001/scoreboard/', options).then((response) => {
            dispatch(joinQuizSuccess(response))

            // TODO: Start websocket connection
        })
    }
}
