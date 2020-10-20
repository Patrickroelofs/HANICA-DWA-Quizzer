import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getQuestions} from '../actions/categoryActions'
import {useHistory} from "react-router-dom";

export const ChooseQuestions = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const current = useSelector(state => state.questions.currentCategory)
    const all_questions = useSelector(state => state.questions.all)

    useEffect(() => {
        dispatch(getQuestions(current))
    }, [dispatch])
    function handleClick(){
        history.push('/categories')
    }
    return (
        <div>
            <button onClick={handleClick}>go back to category selection</button>
            <h1>Choose Questions for {current} </h1>
            {all_questions
            ? all_questions.map(q => {return (
                <li key={q._id}>{q.question}</li>
                )})
            : null}


        </div>
    )
}

export default ChooseQuestions