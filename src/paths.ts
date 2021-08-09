import { IPath } from "./types";

const basePath: string = '/api'
export const paths: IPath = {
    main: '/',
    auth: `${basePath}/auth`,
    pictures: `${basePath}/picture`,
    categories: `${basePath}/categories`,
    
    add: `/add`,
    picture: `/:id`,
    edit: `/edit/:id`,
    remove: `/remove/:id`,
    
    
    login: `/login`,
    logout: `/logout`,
}