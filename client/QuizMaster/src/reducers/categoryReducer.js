import { GET_CATEGORIES, SELECT_CATEGORY, UNSELECT_CATEGORY } from '../actions/categoryActions'

const initialCategoryState = {
    all: '',
    selected: ''
}

const categoryReducer = (state = initialCategoryState, action) => {
    switch (action.type) {
        case GET_CATEGORIES: {
            return { ...state, all: action.payload }
        }

        case SELECT_CATEGORY: {
            return {
                ...state,
                selected: [...state.selected, action.payload]
            }
        }

        case UNSELECT_CATEGORY: {
            return {
                ...state,
                selected: state.selected.filter(item => item !== action.payload)
            }
        }

        case 'NEW_ROUND':
            return {
                selected: ''
            }

        default: {
            return state
        }
    }
}

export default categoryReducer