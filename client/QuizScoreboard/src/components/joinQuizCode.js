import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { joinQuiz } from '../actions/quizActions'

export const JoinQuizCode = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(joinQuiz(e.target.roomCode.value))

        history.push('/waitingroom')
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="roomCode" />
                <input type="submit" value="submit" />
            </form>
        </div>
    )
}

export default JoinQuizCode