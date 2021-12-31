// PATHS
export type TPaths = {
    admin: string
    gallery: string
    cv: string
    cvAdd: string
    cvEdit: (id?: string | number) => string
    add: string
    picture: (id?: string | number) => string
    edit: (id?: string | number) => string
}

export type TPathsAPI = {
    login: string
    logout: string
    categories: string
    cv: string
    cvAdd: string
    cvEdit: (id: string | number) => string
    cvRemove: (id: string | number) => string
    pictures: string
    add: string 
    picture: (id: string | number) => string
    edit: (id: string | number) => string
    remove: (id: string | number) => string
}

// BASE 
export type TCategory = {
    id: string
    name: string
}
export type TPictureForm = {
    name: string
    category: string
    availability: string
    type: string
    size: string
    image: string 
    uploading: boolean
    file?: Blob
}
export type TCvForm = {
    dateFrom: number | string | null
    dateTo: number | string | null
    now: boolean
    text: string
}
export type TAuthForm = {
    login: string
    password: string
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

export type TCv = {
    id?: number  | string
    dateFrom: number | string | null
    dateTo: number | string | null
    now: boolean
    text: string
}

export type TStateRemovePicture = {
    picture?: TPicture
    status?: boolean
}

// API
export type TAuthAPI = {
    login: (data: IAuthAPIData ) => Promise<AxiosResponse<TAuthAPIResponse>>,
    logout: () => Promise<AxiosResponse<TAuthAPIResponse>>
}

export interface IAuthAPIData extends TAuthForm {}

export type TAuthAPIResponse = {
    token: string | null
    error: string | null
}

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
    add: (data: TPictureForm ) => Promise<AxiosResponse<TPictureAPIResponse>>
    edit: (id: string | number, data: TPictureForm ) => Promise<AxiosResponse<TPictureAPIResponse>>
    remove: (id: string | number ) => Promise<AxiosResponse<TPictureAPIResponse>>
}
export type TCvAPI = {
    all: () => Promise<AxiosResponse<TCvAPIResponse>>
    add: (data: TCvForm ) => Promise<AxiosResponse<TCvAPIResponse>>
    edit: (id: string | number, data: TCvForm ) => Promise<AxiosResponse<TCvAPIResponse>>
    remove: (id: string | number ) => Promise<AxiosResponse<TCvAPIResponse>>
}
export type TPictureAPIResponse = {
    pictures: TPicture[] | TPicture | null
    error: string | null
}

export type TCvAPIResponse = {
    data: TCv[] | TCv | null
    error: string | null
}

// Redux
export type TReducerState = {
    availability: TCategory[] | []
    categories: TCategory[] | []
    pictures: TPicture[] | []
    picture: TPicture
    cvList: TCv[] 
    cv: TCv 
}
