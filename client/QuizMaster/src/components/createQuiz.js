import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {createQuiz, deleteQuiz} from '../actions/quizActions'


export const CreateQuiz = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const roomCode = useSelector(state => state.quiz.roomCode)

    useEffect(() => {
        if(roomCode !== '' && window.location.pathname.toString() === '/'){
            dispatch(deleteQuiz())
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createQuiz(e.target.language.value)).then(() => {
            history.push('/lobby')
        })
    }

    return (
        <div className='createQuiz'>
            <h1>QuizzerMaster</h1>
            <form onSubmit={handleSubmit}>
                <select name="language">
                    <option value="NL">Nederlands</option>
                    <option value="EN">English</option>
                </select>
                <input className='button' type="submit" value="Start Quizzing!" />
            </form>
        </div>
    )
}

export default CreateQuiz