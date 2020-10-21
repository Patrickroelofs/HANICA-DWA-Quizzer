import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getCategories, getQuestions, selectCategory, unselectCategory } from '../actions/categoryActions'

export const ChooseCategories = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const AllCategories = useSelector(state => state.categories.all)
    const selectedCategories = useSelector(state => state.categories.selected)

    useEffect(() => {
        dispatch(getCategories())
    }, [dispatch])

    const onSubmit = () => {
        dispatch(getQuestions(selectedCategories)).then(() => {
            history.push('/sendquestions')
        })
    }

    return (
            <div>
                <h1>Choose Categories!</h1>
                
                {selectedCategories.length >= 3
                    ? null
                    : <div>
                        <h3>Choose {`${selectedCategories.length} / 3`} Categories</h3>
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


                <h3>Chosen Categories:</h3>
                {selectedCategories.length > 0
                    ?<p>Click on <button>category</button> <i>(Below)</i> to choose questions <br/> Click on <button>X</button> to unselect that category and choose a new one</p>
                : null}
                <div>
                    {
                        selectedCategories.length >= 1
                        ? selectedCategories.map((category) => {
                                return(
                                    <div key={category.toString()}>
                                        <p>{category.toString() + ' '}
                                            <button onClick={() => dispatch(unselectCategory(category.toString()))}>X</button>
                                        </p>
                                    </div>
                                )
                        })
                        : null
                    }
                </div>
                <div>
                    {
                        selectedCategories.length >= 3
                        ? <button onClick={onSubmit}>Start Sending Questions</button>
                        : null
                    }
                </div>
            </div>
        )
}

export default ChooseCategories