import { ISessionOptions, ICorsOptions } from './types'

export const PORT: string | number = process.env.PORT || 8000
export const SESSION_SECRET: string = process.env.SESSION_SECRET || 'soMeSecreTCodE'
export const CLIENT_HOST: string = process.env.CLIENT_HOST || 'localhost:3000'

export const sessionOptions: ISessionOptions = {
    key: 'token',
    secret: SESSION_SECRET,
    resave: false,
    rolling: true,
    saveUninitialized: false,
}

export const corsOptions: ICorsOptions = {
    origin: `http://${CLIENT_HOST}`
}