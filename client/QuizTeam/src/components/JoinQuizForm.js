import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { joinQuiz } from '../actions/quizActions'

export const JoinQuizForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(joinQuiz(e.target.roomCode.value, e.target.teamName.value))

        history.push('/waitingroom')
    }

    return (
        <div>
            <form method='post' onSubmit={handleSubmit}>
                <input name='teamName' type='text' placeholder='team name...'/>
                <input name='roomCode' type='text' placeholder='room code...'/>
                <button type="submit" value="Submit" className='submitTeamButton'>Login & create websocket</button>
            </form>
        </div>
    )
}

export default JoinQuizForm