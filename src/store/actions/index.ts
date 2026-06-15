import { categoryAPI, pictureAPI } from 'api'
import {
  GET_CATEGORIES,
  GET_PICTURE,
  GET_PICTURES,
} from 'store/typeActions'
import type { AppDispatch } from 'store'

export const getCategories = () => async (dispatch: AppDispatch) => {
  await categoryAPI
    .categories()
    .then(({ data: { data } }) => {
      dispatch({
        type: GET_CATEGORIES,
        payload: data,
      })
    })
    .catch((error) => {
      const data = error?.response?.data?.data ?? []
      dispatch({
        type: GET_CATEGORIES,
        payload: data,
      })
    })
}

export const getPictures = (category: string) => async (dispatch: AppDispatch) => {
  await pictureAPI
    .pictures()
    .then(({ data: { data } }) => {
      dispatch({
        type: GET_PICTURES,
        payload: data,
        category,
      })
    })
    .catch((error) => {
      const data = error?.response?.data?.data ?? []
      dispatch({
        type: GET_PICTURES,
        payload: data,
        category,
      })
    })
}

export const getPicture = (id: string | number) => async (dispatch: AppDispatch) => {
  await pictureAPI
    .picture(id)
    .then(({ data: { data } }) => {
      dispatch({
        type: GET_PICTURE,
        payload: data,
      })
    })
    .catch((error) => {
      const data = error?.response?.data?.data ?? null
      dispatch({
        type: GET_PICTURE,
        payload: data,
      })
    })
}
