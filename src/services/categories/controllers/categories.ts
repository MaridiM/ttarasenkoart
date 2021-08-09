import { Request, Response } from 'express'
import { ICategoryController, ICategoryResponse } from '../types'
import Categories from './../../../db/category.json'

export const CategoryController: ICategoryController = {
    main: (req: Request, res: Response): Response<ICategoryResponse, Record<string, any>> => {
        try {
            if(Categories) {
                return res.status(200).json({
                    data: [...Categories], 
                    error: null
                })
            }
            return res.status(200).json({
                data: [], 
                error: 'Have no any category'
            })
            
        } catch (error) {
            return res.status(500).json({
                data: [], 
                error: 'Internal Server Error'
            })
        }
    },
}