import { TPaths, TPathsAPI } from "./types";

export const paths: TPaths = {
    main: '/',
    home: '/home',
    cv: '/cv',
    gallery: '/gallery',
    contact: '/contact',
    texts: '/texts',
}

const baseApiPath: string = '/api'

export const pathsAPI: TPathsAPI =  {
    categories: `${baseApiPath}/categories`,
    pictures: `${baseApiPath}/picture`,
    picture: (id: string | number) => id ? `${baseApiPath}/picture/${id}` : `${baseApiPath}/picture/:id`,
}