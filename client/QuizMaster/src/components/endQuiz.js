import { round } from 'lodash'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { calculateScores, deleteQuiz } from '../actions/quizActions'
import { sendMessage } from '../actions/sessionActions'
import { translate } from '../functions/language'
export const EndQuiz = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    
    const roundNumber = useSelector(state => state.quiz.roundNumber)
    const roomCode = useSelector(state => state.quiz.roomCode)
    const language = useSelector(state => state.quiz.language)
    const endResults = useSelector(state => state.quiz.endResults)

    const newRound = () => {
        dispatch(calculateScores()).then(() => {
            history.push('/categories')
        })
    }

    const endQuiz = () => {
        dispatch(deleteQuiz())
        //.then(() => {
            // this makes the error dissapear but then it wont reload on refresh
            // if(window.location.pathname !== '/' && roomCode === '') {
            //     history.push('/')
            // }
        //})
    }

    const showEndResults = () => {
        dispatch(calculateScores()).then(() => {
            dispatch({type: 'END_RESULTS'})
            dispatch(sendMessage({type: 'END_RESULTS'}))
        })
    }

    if(window.location.pathname !== '/' && roomCode === '') {
        history.push('/')
    }

    return (
        <div className='endQuiz'>
            {roundNumber >= 3
                ? null
                : <h1>{translate(language, 'newRound')}</h1>
            }

            {roundNumber >= 3
                ? <h1>{translate(language, 'threeRoundsPlayed')}</h1>
                : endResults
                    ? null
                    : <button className='button full' onClick={newRound}>{translate(language, 'rounds')} ({roundNumber}/3)</button>
            }


            <button className='button full' onClick={showEndResults}>{translate(language, 'showresults')}</button>
            <button className='button full' onClick={endQuiz}>{translate(language, 'endQuiz')}</button>
        </div>
    )
}

export default EndQuiz