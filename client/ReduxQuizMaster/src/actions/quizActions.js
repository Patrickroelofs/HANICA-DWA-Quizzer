import { webSocket } from './sessionActions'

export const CREATE_QUIZ = 'CREATE_QUIZ'
export const START_QUIZ = 'START_QUIZ'


function ActionCreateQuiz(payload) {
    return {
        type: CREATE_QUIZ,
        language: payload.language,
        roomCode: payload.roomCode,
    }
}

export function createQuiz(language) {
    return (dispatch) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify({ language: language }),
        }

        fetch('http://localhost:3001/quiz/', options)
            .then((response) => response.json())
            .then((data) => {
                dispatch(webSocket())
                dispatch(
                    ActionCreateQuiz({
                        language: data.language,
                        roomCode: data.roomCode,
                    })
                )

            })
    }
}

function ActionStartQuiz(payload) {
    return {
        type: START_QUIZ,
        payload: payload
    }
}

export function startQuiz() {
    return (dispatch) => {
        //TODO: Send start quiz to server and have it message all users
        dispatch(ActionStartQuiz(true))
    }
}