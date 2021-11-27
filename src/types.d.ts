export interface ISessionOptions {
    key?: string,
    secret: string,
    rolling?: boolean,
    resave?: boolean,
    saveUninitialized: boolean,
    cookie?: ICookieOptions
    store?: any
}
export interface ICookieOptions {
    domain?: string
    path?: string
    httpOnly?: boolean
    secure?: boolean
    maxAge?: number
}
export interface ICorsOptions {
    origin: string,
    credentials?: boolean
}
export interface IPath {
    pictures: string
    picture: string
    add: string
    edit: string
    remove: string
    categories: string
    cv: string
    login: string
    logout: string
    auth: string
    main: string
}