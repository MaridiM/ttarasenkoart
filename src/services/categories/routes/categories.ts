import express from 'express'
import { paths } from '../../../paths'
import { CategoryController } from '../controllers/categories'

const router = express.Router()

router.get(paths.main, CategoryController.main)

export default router