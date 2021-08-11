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

const app = express()


app.use(cors(corsOptions))
app.use(session(sessionOptions))
app.use(cookieParser())
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.use(paths.auth, authRoutes)
app.use(paths.categories, categoriesRoutes)
app.use(paths.pictures, pictureRoutes)

app.listen(PORT, () => {
    console.log(`Service listening on port ${PORT}`)
})