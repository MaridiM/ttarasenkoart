import { Request, Response } from 'express'
import { ICategoryController, ICategoryResponse } from '../types'
import path from 'path'
import fs from 'fs'

const filePathCategory = path.join(__dirname, './../../../db/category.json')
export const CategoryController: ICategoryController = {
    main: (req: Request, res: Response): Response<ICategoryResponse, Record<string, any>> => {
        try {
            // Write in file
            const categories = JSON.parse(fs.readFileSync(filePathCategory, 'utf-8'))

            if(!categories) return res.status(200).json({ data: [], error: 'Have no any category' })
            
            return res.status(200).json({
                data: [...categories], 
                error: null
            })
            
            
        } catch (error) {
            return res.status(500).json({
                data: [], 
                error: 'Internal Server Error'
            })
        }
    },
}