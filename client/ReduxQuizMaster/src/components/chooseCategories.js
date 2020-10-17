import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories, selectCategory, unselectCategory } from './../actions/categoryActions'

export const ChooseCategories = () => {
    const dispatch = useDispatch()
    const AllCategories = useSelector(state => state.categories.all)
    const selectedCategories = useSelector(state => state.categories.selected)
    
    useEffect(() => {
        dispatch(getCategories())
    }, [dispatch])

        return (
            <div>
                <h1>Choose Categories!</h1>
                
                {selectedCategories.length >= 3
                    ? null
                    : <div>
                        <p>Choose {`${selectedCategories.length} / 3`} Categories</p>
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


                <p>Chosen Categories:</p>
                <div>
                    {
                        selectedCategories.length >= 1
                        ? selectedCategories.map((category) => {
                            return <button onClick={() => dispatch(unselectCategory(category.toString()))} key={category.toString()}>{category.toString()}</button>
                        })
                        : null
                    }
                </div>
                <div>
                    {
                        selectedCategories.length >= 3
                        ? <button>Start Sending Questions</button>
                        : null
                    }
                </div>
            </div>
        )
}

export default ChooseCategories