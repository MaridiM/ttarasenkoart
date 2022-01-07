import { TReducerState } from './../../types.d';
import { 
    ADD_CV,
    ADD_PICTURE,
    EDIT_CV,
    EDIT_PICTURE,
    GET_ALL_CV,
    GET_CATEGORIES, 
    GET_CV, 
    GET_PICTURE, 
    GET_PICTURES,
    REMOVE_CV,
    REMOVE_PICTURE,
} from 'store/typeActions'

const initialState: TReducerState = {
    categories: [],
    availability: [
        {
            "id" : "sold",
            "name" : "Sold"
        },
        {
            "id" : "in stock",
            "name" : "In stock"
        },
    ],
    pictures: [],
    picture: {
        id: '',
        name: '',
        category: '',
        availability: '',
        type: '',
        size: '',
        image: ''
    },
    cvList: [],
    cv: {
        id: '',
        dateFrom: null,
        dateTo: null,
        now: false,
        text: ''
    }

}

const reducer = (state = initialState, { type, payload } ) => {
    switch (type) {
        // CATEGORY
        case GET_CATEGORIES:
            return {
                ...state,
                categories: [...payload]
            }

        // PICTURES
        case GET_PICTURES:
            return {
                ...state,
                pictures:  [ ...payload ]
            }

        case GET_PICTURE:
            const picture = state.pictures.filter( c => c.id === payload)[0]
            return { ...state, picture }

        case ADD_PICTURE:
            return {
                ...state,
                pictures: [ payload.picture, ...state.pictures],
                categories: payload.categories 
                    ? [state.categories[0], ...payload.categories] 
                    : [...state.categories]
            }
        case EDIT_PICTURE:
            let updatedPict = state.pictures.map(p => {
                if (p.id === payload.picture.id) {
                    p = payload.picture
                }
                return p
            })
            return {
                ...state,
                pictures: [  ...updatedPict ],
                categories: payload.categories 
                    ? [state.categories[0], ...payload.categories] 
                    : [...state.categories]
            }
        case REMOVE_PICTURE:
            return {
                ...state,
                pictures: [ ...payload.pictures ],
                categories: [ state.categories[0], ...payload.categories ]
            }

        // CV
        case GET_ALL_CV:
            return {
                ...state,
                cvList:  [ ...payload ]
            }

        case GET_CV:
            const cv = state.cvList.filter( c => c.id === payload)[0]
            return { ...state, cv }
        case ADD_CV:
            return {
                ...state,
                cvList: [...payload]
            }
        case EDIT_CV:
            console.log(payload)
            return {
                ...state,
                cvList: [...state.cvList, ...payload]
            }
        case REMOVE_CV:
            const removedCv = state.cvList.filter( c => c.id !== payload)
            return {
                ...state,
                cvList: [ ...removedCv ]
            }

        default:
            return state
    }
}


export default reducer