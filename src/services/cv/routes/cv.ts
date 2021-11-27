import express from 'express'
import { paths } from '../../../paths'
import { CvController } from '../controllers/cv'


const router = express.Router()

router.get(paths.main, CvController.main)

router.post(paths.add, CvController.add)

router.post(paths.edit, CvController.update)

router.post(paths.remove, CvController.remove)

export default router