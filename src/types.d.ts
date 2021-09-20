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

// BASE 
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

// API
export type TCategoryAPI = {
    categories: () => Promise<AxiosResponse<TCategoryAPIResponse>>
}
export type TCategoryAPIResponse = {
    categories: TCategory[] | null
    error: string | null
}

export type TPictureAPI = {
    pictures: () => Promise<AxiosResponse<TPictureAPIResponse>>
    picture: (id: string | number) => Promise<AxiosResponse<TPictureAPIResponse>>
}
export type TPictureAPIResponse = {
    pictures: TPicture[] | TPicture | null
    error: string | null
}

// Redux
export type TCategories = {
    categories: TCategory[] | []
    pictures: TPicture[] | []
    picture: TPicture
}