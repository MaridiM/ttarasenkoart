import session from 'express-session';
import { ISessionOptions, ICorsOptions } from './types';

export const PORT: string | number = process.env.PORT || 8000
export const SESSION_SECRET: string = process.env.SESSION_SECRET || 'SOMEsecREtCoDeFoRSEsSiON'
export const CLIENT_HOST: string = process.env.CLIENT_HOST || 'localhost:3000'

var MemoryStore =session.MemoryStore

export const sessionOptions: ISessionOptions = {
    key: 'token',
    secret: SESSION_SECRET,
    resave: false,
    rolling: true,
    store: new MemoryStore(),
    saveUninitialized: false,
    cookie: {
        domain: 'localhost',
        httpOnly: true,
        secure: false,
        maxAge: 60*1000
    }
    
}
export const cookieOptionsSecret: string = 'SOMEsecREtCoDeFoRCoOkIE'

export const corsOptions: ICorsOptions = {
    origin: `http://${CLIENT_HOST}`,
    credentials: true
}