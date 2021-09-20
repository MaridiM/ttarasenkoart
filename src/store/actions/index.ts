import { ADD_PICTURE, EDIT_PICTURE, REMOVE_PICTURE } from './../typeActions';
import { TPictureForm } from './../../types.d';
import { categoryAPI, pictureAPI } from 'api'
import { 
    GET_CATEGORIES, 
    GET_PICTURE, 
    GET_PICTURES,
} from 'store/typeActions'
import { toast } from 'react-toastify';
import { paths } from 'paths';



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

export const getPictures = () => async dispatch => {
    await pictureAPI.pictures()
        .then(({data: {data}}) => {
            dispatch({
                type: GET_PICTURES,
                payload: data,
            })
            
        })
        .catch(({ response: { data: { data, error }}}) => {
            dispatch({
                type: GET_PICTURES,
                payload: data,
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

export const addPicture = (dataForm: TPictureForm)=> async dispatch => {
    const { data: { data, error }} = await pictureAPI.add(dataForm) 
    dispatch({
        type: ADD_PICTURE,
        payload: data 
    })

    if (error) {
        toast.error(error)
        return
    } 
    toast.success('Picture added successfully')
    setTimeout(() => {
        document.location.pathname = paths.admin 
    }, 5000)
    return
}

export const editPicture = (id: string | number, dataForm: TPictureForm)=> async dispatch => {
    const {data: { data, error }} = await pictureAPI.edit(id, dataForm)
    dispatch({
        type: EDIT_PICTURE,
        payload: data 
    })

    if (error) {
        toast.error(error)
        return
    } 
    toast.success('Picture updated successfully')
    setTimeout(() => {
        document.location.pathname = paths.edit(data.id) 
    }, 2000)
    return
}

export const removePicture = (id: string | number)=> async dispatch => {
    const {data: { data }} = await pictureAPI.remove(id)
    dispatch({
        type: REMOVE_PICTURE,
        payload: data 
    })
    document.location.pathname = paths.gallery
    return
}