import { TCategories } from './../../types.d';
import { 
    GET_CATEGORIES, 
    GET_PICTURE, 
    GET_PICTURES,
} from 'store/typeActions'

const initialState: TCategories = {
    categories: [],
    pictures: [],
    picture: {
        id: '',
        name: '',
        category: '',
        availability: '',
        type: '',
        size: '',
        image: ''
    }
}

const reducer = (state = initialState, { type, payload, category } ) => {
    switch (type) {
        case GET_CATEGORIES:
            return {
                ...state,
                categories: [...state.categories, ...payload]
            }

        case GET_PICTURES:
            const filteredGallery = payload.filter(item => item.category === category)
            return {
                ...state,
                pictures: category === 'all' ? payload : filteredGallery
            }

        case GET_PICTURE:
            return {
                ...state,
                picture: payload
            }

        default:
            return state
    }
}


export default reducer