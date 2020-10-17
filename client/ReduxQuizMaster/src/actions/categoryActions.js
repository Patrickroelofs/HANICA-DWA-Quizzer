export const GET_CATEGORIES = 'GET_CATEGORIES'

function ActionGetCategories(payload) {
    return {
        type: GET_CATEGORIES,
        payload: payload
    }
}

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
            dispatch(ActionGetCategories(data))
        })
    }
}

export const SELECT_CATEGORY = 'SELECT_CATEGORY'

function ActionSelectCategory(payload) {
    return {
        type: SELECT_CATEGORY,
        payload: payload
    }
}

export function selectCategory(category) {
    return (dispatch) => {
        dispatch(ActionSelectCategory(category))
    }
}

export const UNSELECT_CATEGORY = 'UNSELECT_CATEGORY'

function ActionUnselectCategory(payload) {
    return {
        type: UNSELECT_CATEGORY,
        payload: payload
    }
}

export function unselectCategory(category) {
    return (dispatch) => {
        dispatch(ActionUnselectCategory(category))
    }
}