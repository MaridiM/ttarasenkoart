import express from 'express'
import { paths } from '../../../paths'
import { AuthController } from '../controllers/auth'


const router = express.Router()

router.post(paths.login, AuthController.login)
router.post(paths.logout, AuthController.logout)

export default router