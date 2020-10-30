import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getCategories, getQuestions, selectCategory, unselectCategory } from '../actions/categoryActions'
import { createRound } from '../actions/quizActions'
import { translate } from '../functions/language'

export const ChooseCategories = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const AllCategories = useSelector(state => state.categories.all)
    const selectedCategories = useSelector(state => state.categories.selected)
    const roundNumber = useSelector(state => state.quiz.roundNumber)
    const roomCode = useSelector(state => state.quiz.roomCode)
    const language = useSelector(state => state.quiz.language)

    useEffect(() => {
        dispatch(getCategories())
    }, [dispatch])

    const onSubmit = () => {
        dispatch(getQuestions(selectedCategories)).then(() => {
            dispatch(createRound(selectedCategories, roundNumber)).then(() => {
                history.push('/sendquestions')
            })
        })
    }

    if(window.location.pathname !== '/' && roomCode === '') {
        history.push('/')
    }

    return (
            <div className='chooseCategories'>
                <h1>{translate(language, 'categories')}</h1>
                
                {selectedCategories.length >= 3
                    ? null
                    : <div>
                        <h3>{`${selectedCategories.length} / 3`}</h3>
                        {AllCategories
                        ? AllCategories.map((category) => {
                            return selectedCategories.includes(category)
                                ? null
                                : <button onClick={() => dispatch(selectCategory(category.toString()))} key={category.toString()}>{category.toString()}</button>
                          })
                        : null
                    }
                </div>
                }


                
                <div className='chosenCategories'>
                    {selectedCategories.length >= 1
                        ? <h3>{translate(language, 'chosenCategories')}</h3>
                        : null
                    }
                    {
                        selectedCategories.length >= 1
                        ? selectedCategories.map((category) => {
                                return(
                                    <button key={category.toString()} onClick={() => dispatch(unselectCategory(category.toString()))}>{category.toString()}</button>
                                )
                        })
                        : null
                    }
                </div>
                <div className='sendCategories'>
                    {
                        selectedCategories.length >= 3
                        ? <button onClick={onSubmit}>{translate(language, 'startSendingQuestions')}</button>
                        : null
                    }
                </div>
            </div>
        )
}

export default ChooseCategories