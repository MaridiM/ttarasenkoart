import { categoryAPI, pictureAPI } from 'api'
import { 
    GET_CATEGORIES, 
    GET_PICTURE, 
    GET_PICTURES,
} from 'store/typeActions'


// CATEGORIES

export const getCategories = () => async dispatch => {
    await categoryAPI.categories()
        .then(({data: { data }}) => {
            dispatch({
                type: GET_CATEGORIES,
                payload: data 
            })
        })
        .catch(({ response: { data: { data, error }}}) => {
            dispatch({
                type: GET_CATEGORIES,
                payload: data 
            })
        })
            
} 

// PICTURES

export const getPictures = (category: string) => async dispatch => {
    await pictureAPI.pictures()
        .then(({data: {data}}) => {
            dispatch({
                type: GET_PICTURES,
                payload: data,
                category 
            })
            
        })
        .catch(({ response: { data: { data, error }}}) => {
            dispatch({
                type: GET_PICTURES,
                payload: data,
                category
            })
        })
}

export const getPicture = (id: string | number) => async dispatch => {
        await pictureAPI.picture(id)
            .then(({data: {data}}) => {
                dispatch({
                    type: GET_PICTURE,
                    payload: data 
                })
            })
            .catch(({ response: { data: { data, error }}}) => {
                dispatch({
                    type: GET_PICTURE,
                    payload: data 
                })
            })
    }