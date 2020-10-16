import { webSocket } from './sessionActions'

export const CREATE_QUIZ = 'CREATE_QUIZ'

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
