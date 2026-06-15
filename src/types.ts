import type { AxiosResponse } from 'axios'

export type TPaths = {
  main: string
  home: string
  cv: string
  gallery: string
  contact: string
  texts: string
}

export type TPathsAPI = {
  categories: string
  pictures: string
  picture: (id: string | number) => string
}

export type TCategory = {
  id: string
  name: string
}

export type TPicture = {
  id: number | string
  name: string
  category: string
  availability: string
  type: string
  size: string
  image: string
}

export type TCategoryAPI = {
  categories: () => Promise<AxiosResponse<TCategoryAPIResponse>>
}

export type TCategoryAPIResponse = {
  data: TCategory[]
  categories?: TCategory[] | null
  error?: string | null
}

export type TPictureAPI = {
  pictures: () => Promise<AxiosResponse<TPictureAPIResponse>>
  picture: (id: string | number) => Promise<AxiosResponse<TPictureAPIResponse>>
}

export type TPictureAPIResponse = {
  data: TPicture[] | TPicture
  pictures?: TPicture[] | TPicture | null
  error?: string | null
}

export type TCategories = {
  categories: TCategory[]
  pictures: TPicture[]
  picture: TPicture
}

export type RootState = TCategories
