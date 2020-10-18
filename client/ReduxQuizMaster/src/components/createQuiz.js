import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createQuiz } from '../actions/quizActions'
import { webSocket } from '../actions/sessionActions'

export const CreateQuiz = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(webSocket())
    }, [dispatch])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createQuiz(e.target.language.value))
        
        history.push('/lobby')
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <select name="language">
                    <option value="NL">Nederlands</option>
                    <option value="EN">English</option>
                </select>
                <input type="submit" value="submit" />
            </form>
        </div>
    )
}

export default CreateQuiz