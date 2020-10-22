export const GET_CATEGORIES = 'GET_CATEGORIES'
export const GET_QUESTIONS = 'GET_QUESTIONS'
export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export const UNSELECT_CATEGORY = 'UNSELECT_CATEGORY'

export function getCategories() {
    return (dispatch) => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            mode: 'cors',
        }

        fetch(`http://localhost:3001/questions/categories`, options)
        .then((response) => response.json())
        .then((data) => {
            dispatch({type: GET_CATEGORIES, payload: data})
        })
    }
}

export function getQuestions(categories) {
    return async (dispatch) => {
        try {
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                mode: "cors",
                body: JSON.stringify(categories)
            }

            await fetch(`http://localhost:3001/questions/categories`, options)
                .then((response) => response.json())
                .then((data) => {
                    dispatch({type: GET_QUESTIONS, payload: data})
                })

        } catch (e) {
            console.log("error (function getQuestions)", e)
        }
    }
}

export function selectCategory(category) {
    return (dispatch) => {
        dispatch({type: SELECT_CATEGORY, payload: category})
    }
}

export function unselectCategory(category) {
    return (dispatch) => {
        dispatch({type: UNSELECT_CATEGORY, payload: category})
    }
}