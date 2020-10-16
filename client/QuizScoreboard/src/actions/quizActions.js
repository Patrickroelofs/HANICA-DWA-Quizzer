export const JOIN_QUIZ_SUCCESS = 'JOIN_QUIZ_SUCCESS'
export const GET_TEAMS = 'GET_TEAMS'

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

        fetch('http://localhost:3001/scoreboard/', options).then(() => {
            dispatch(joinQuizSuccess(roomCode))

            // TODO: Start websocket connection
        })
    }
}

function ActionGetTeams(payload) {
    return {
        type: GET_TEAMS,
        payload: payload,
    }
}

export function getTeams(roomCode) {
    return (dispatch) => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            mode: 'cors',
        }

        fetch(`http://localhost:3001/teams/${roomCode}`, options)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                dispatch(ActionGetTeams(data))
            })
    }
}
