import { TPaths, TPathsAPI } from "types"

export const paths: TPaths = {
    admin: '/',
    gallery: '/gallery',
    cv: '/cv',
    cvAdd: '/cv/add',
    cvEdit: (id?: string | number): string => id ? `/cv/edit/${id}` : '/cv/edit/:id',
    add: '/gallery/p/add',
    picture: (id?: string | number): string => id ? `/p/${id}` : '/p/:id',
    edit: (id?: string | number): string => id ? `/gallery/p/${id}` : '/gallery/p/:id',
}

const baseApiPath: string = '/api'

export const pathsAPI: TPathsAPI =  {
    login: `${baseApiPath}/auth/login`,
    logout: `${baseApiPath}/auth/logout`,

    categories: `${baseApiPath}/categories`,

    cv: `${baseApiPath}/cv`,
    cvAdd: `${baseApiPath}/cv/add`,
    cvEdit: (id: string | number) => id ? `${baseApiPath}/cv/edit/${id}` : `${baseApiPath}/cv/edit/:id`,
    cvRemove: (id: string | number) => id ? `${baseApiPath}/cv/remove/${id}` : `${baseApiPath}/cv/remove/:id`,


    pictures: `${baseApiPath}/picture`,
    add: `${baseApiPath}/picture/add`,
    picture: (id: string | number) => id ? `${baseApiPath}/picture/${id}` : `${baseApiPath}/picture/:id`,
    edit: (id: string | number) => id ? `${baseApiPath}/picture/edit/${id}` : `${baseApiPath}/picture/edit/:id`,
    remove: (id: string | number) => id ? `${baseApiPath}/picture/remove/${id}` : `${baseApiPath}/picture/remove/:id`,
}