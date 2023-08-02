import session from 'express-session';
import { ISessionOptions, ICorsOptions } from './types';

export const MONGODB_URI: string = process.env.MONGODB_URI || 'mongodb+srv://ttarasenkoart:<password>@cluster0.ui2vp.mongodb.net/?retryWrites=true&w=majority'

export const PORT: string | number = process.env.PORT || 8000
export const SESSION_SECRET: string = process.env.SESSION_SECRET || 'SOMEsecREtCoDeFoRSEsSiON'
export const CLIENT_HOST: string = process.env.CLIENT_HOST || '*'

// Cloudinary
export const REACT_APP_CLOUDINARY_API_KAY: string = process.env.REACT_APP_CLOUDINARY_API_KAY || '821279233882751'
export const REACT_APP_CLOUDINARY_API_SECRET: string = process.env.REACT_APP_CLOUDINARY_API_SECRET || 'RXcPZVDEzyS9ynNC-VAmlDK78IQ'
export const REACT_APP_CLOUDINARY_UPLOAD_PRESET: string = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || 'pxrbylo3_ttarasenkoart.com'
export const REACT_APP_CLOUDINARY_API_URL: string = process.env.REACT_APP_CLOUDINARY_API_URL || 'https://api.cloudinary.com/v1_1/dki4lxdki/image/upload'
export const REACT_APP_CLOUDINARY_CLOUD_NAME: string = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || 'dki4lxdki'


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
    origin: CLIENT_HOST  || '*',
    credentials: true
}
