import {webSocket} from "./sessionActions";

export const CREATE_QUIZ = 'CREATE_QUIZ'
export const START_QUIZ = 'START_QUIZ'

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
                dispatch(
                    {
                        type: CREATE_QUIZ,
                        language: data.language,
                        roomCode: data.roomCode
                    }
                )
            }).then(() => {
            dispatch(webSocket())
        })
    }
}

export function startQuiz() {
    return (dispatch) => {
        //TODO: Send start quiz to server and have it message all users
        dispatch({type: START_QUIZ, payload: true})
    }
}