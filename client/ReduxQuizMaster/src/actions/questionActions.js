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