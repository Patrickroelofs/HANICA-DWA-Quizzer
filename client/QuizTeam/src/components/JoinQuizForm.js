import React, {useEffect}from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useHistory} from 'react-router-dom'
import { joinQuiz } from '../actions/quizActions'
import { translate } from '../functions/language'


export const JoinQuizForm = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const language = useSelector(state => state.quiz.language)
    const accepted = useSelector(state => state.quiz.accepted)
    const roomCode = useSelector(state => state.quiz.roomCode)
    const started = useSelector(state => state.quiz.started)
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(joinQuiz(e.target.roomCode.value, e.target.teamName.value))
        if(accepted) {
            history.push('/waitingroom')
        }
    }
    useEffect(() => {
        if(started === false){
            dispatch({type: 'DISCONNECTED_MASTER_LEFT'})
        }
        if(accepted && started === undefined){
            history.push('/waitingroom')
        }
    }, [accepted, dispatch, history, started])

    if(window.location.pathname !== '/' && roomCode === '') {
        history.push('/')
    }
    
    return (
        <div className='joinQuizForm'>
            <h1>QuizzerTeam</h1>
            {roomCode === ''
                ?   <form method='post' onSubmit={handleSubmit}>
                        <input className='input' name='teamName' type='text' placeholder='team name...'/>
                        <input className='input second' name='roomCode' type='text' placeholder='room code...'/>
                        <button className='button' type="submit" value="Submit">{translate(language, 'loginWithTeam')}</button>
                    {accepted === false ? <p>{translate(language, 'roomStarted')}</p> : null}
                    </form>

                : accepted !== false
                    ? <p>{translate(language, 'waitingForReview')} {roomCode} </p>
                    : <p>{translate(language, 'rejected')}</p>
            }
            {}
        </div>
    )
}

export default JoinQuizForm