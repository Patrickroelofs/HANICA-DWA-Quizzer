import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createQuiz } from '../actions/quizActions'


export const CreateQuiz = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createQuiz(e.target.language.value)).then((data) => {
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
                <input className='button' type="submit" value="Quiz maken" />
            </form>
        </div>
    )
}

export default CreateQuiz