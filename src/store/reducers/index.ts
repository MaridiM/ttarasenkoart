import { TCategories } from './../../types.d';
import { 
    ADD_PICTURE,
    EDIT_PICTURE,
    GET_CATEGORIES, 
    GET_PICTURE, 
    GET_PICTURES,
    REMOVE_PICTURE,
} from 'store/typeActions'

const initialState: TCategories = {
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

}

const reducer = (state = initialState, { type, payload, category } ) => {
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
            return {
                ...state,
                picture: { ...payload }
            }
        case ADD_PICTURE:
            return {
                ...state,
                pictures: [...state.pictures, ...payload]
            }
        case EDIT_PICTURE:
            return {
                ...state,
                pictures: [...state.pictures, ...payload]
            }
        case REMOVE_PICTURE:
            return {
                ...state,
                pictures: [...state.pictures, ...payload]
            }

        default:
            return state
    }
}


export default reducer