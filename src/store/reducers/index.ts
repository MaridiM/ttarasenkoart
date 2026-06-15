import type { TCategories, TCategory, TPicture } from '../../types'
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
    image: '',
  },
}

type ReducerAction = {
  type: string
  payload?: TCategory[] | TPicture[] | TPicture
  category?: string
}

const reducer = (state = initialState, { type, payload, category }: ReducerAction) => {
  switch (type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: [...(payload as TCategory[])],
      }

    case GET_PICTURES: {
      const pictures = payload as TPicture[]
      const filteredGallery = pictures.filter((item) => item.category === category)
      return {
        ...state,
        pictures: category === 'all' ? pictures : filteredGallery,
      }
    }

    case GET_PICTURE:
      return {
        ...state,
        picture: payload as TPicture,
      }

    default:
      return state
  }
}

export default reducer
