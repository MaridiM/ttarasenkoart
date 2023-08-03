import './db'

import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import session from 'express-session'

import { corsOptions, PORT, sessionOptions } from './config'
import { paths } from './paths'
import { authRoutes } from './services/auth/routes'
import { pictureRoutes } from './services/pictures/routes'
import { categoriesRoutes } from './services/categories/routes'
import { cvRoutes } from './services/cv/routes'

// MongoDB models
import './services/pictures/models'
import './services/categories/models'


const app = express()


app.use(cors(corsOptions))
app.use(session(sessionOptions))
app.use(cookieParser())
app.use(helmet())
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));
app.use(express.json());


app.use(paths.auth, authRoutes)
app.use(paths.categories, categoriesRoutes)
app.use(paths.pictures, pictureRoutes)
app.use(paths.cv, cvRoutes)


app.listen(PORT, () => {
    console.log(`Service listening on port ${PORT}`)
})