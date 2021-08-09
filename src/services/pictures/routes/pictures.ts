import express from 'express'
import { paths } from '../../../paths'
import { PictureController } from '../controllers/pictures'

const router = express.Router()

router.get(paths.main, PictureController.main)

router.post(paths.add, PictureController.add)

router.post(paths.edit, PictureController.edit)

router.post(paths.remove, PictureController.remove)

export default router