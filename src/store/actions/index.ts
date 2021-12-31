import { ADD_CV, ADD_PICTURE, EDIT_CV, EDIT_PICTURE, GET_ALL_CV, GET_CV, REMOVE_CV, REMOVE_PICTURE } from './../typeActions';
import { TCvForm, TPictureForm } from './../../types.d';
import { categoryAPI, cvAPI, pictureAPI } from 'api'
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
    dispatch({
        type: GET_PICTURE,
        payload: id 
    })
}

export const addPicture = (dataForm: TPictureForm)=> async dispatch => {
    const { data: { data, error }} = await pictureAPI.add(dataForm) 
    if(error) {
        toast.error(error)
        return
    } 

    dispatch({
        type: ADD_PICTURE,
        payload: data 
    })
    toast.success('Picture added successfully')
    return
}

export const editPicture = (id: string | number, dataForm: TPictureForm)=> async dispatch => {
    const {data: { data, error }} = await pictureAPI.edit(id, dataForm)

    if (error) return toast.error(error)

    dispatch({
        type: EDIT_PICTURE,
        payload: data 
    })
    return toast.success('Picture updated successfully')
}

export const removePicture = (id: string | number)=> async dispatch => {
    const {data: { error }} = await pictureAPI.remove(id)
    if (error) return toast.error(error)
    dispatch({
        type: REMOVE_PICTURE,
        payload: id 
    })
    return

}


// CV
export const getAllCv = () => async dispatch => {
    await cvAPI.all()
        .then(({data: {data}}) => {
            dispatch({
                type: GET_ALL_CV,
                payload: data,
            })
            
        })
        .catch(({ response: { data: { data, error }}}) => {
            dispatch({
                type: GET_ALL_CV,
                payload: data,
            })
        })
}

export const getCv = (id: string | number) => async dispatch => {
    dispatch({
        type: GET_CV,
        payload: id 
    })
}

export const addCv = (dataForm: TCvForm) => async dispatch => {
    const { data: { data, error }} = await cvAPI.add(dataForm) 
     if(error) {
        toast.error(error)
        return false
    } 

    dispatch({
        type: ADD_CV,
        payload: data 
    })
    toast.success('Picture added successfully')
    return true
}

export const editCv = (id: string | number, dataForm: TCvForm)=> async dispatch => {
    const {data: { data, error }} = await cvAPI.edit(id, dataForm)
    dispatch({
        type: EDIT_CV,
        payload: data 
    })

    if (error) {
        toast.error(error)
        return
    } 
    toast.success('CV updated successfully')
    setTimeout(() => {
        document.location.pathname = paths.edit(data.id) 
    }, 2000)
    return
}

export const removeCv = (id: string | number)=> async dispatch => {
    const {data: { error }} = await cvAPI.remove(id)
    if (error) return toast.error(error)

    dispatch({
        type: REMOVE_CV,
        payload: id 
    })
    return
}