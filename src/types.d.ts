export interface ISessionOptions {
    key: string,
    secret: string,
    rolling: boolean,
    resave: boolean,
    saveUninitialized: boolean,
}
export interface ICorsOptions {
    origin: string
}