import { Request, Response } from "express"
import fs from "fs"
import path from "path"
import { IPicture, IPictureController, IPictureResponse } from "../types"
import Pictures from './../../../db/gallery.json'

export const PictureController: IPictureController = {
    main: (req: Request, res: Response): Response<IPictureResponse, Record<string, any>>  => {
        try {
            if(Pictures) {
                return res.status(200).json({
                    data: Pictures,
                    error: null
                })
            }
            return res.status(200).json({
                data: [],
                error: null
            })
        } catch (error) {
            return res.status(500).json({
                data: [],
                error: 'Internal Server Error'
            })
        }
    },
    
    add: (req: Request, res: Response): Response<IPictureResponse, Record<string, any>> => {
        try {
            const filePath = path.join(__dirname, './../../../db/gallery.json')
            
            // Validation required inputs
            if ( req.body.name === '' ) return res.status(204).json({data: [], error: 'Title can not be empty'})
            if ( req.body.category === '' ) return res.status(204).json({data: [], error: 'Category can not be empty'})
            if ( req.body.image === '' ) return res.status(204).json({data: [], error: 'Image can not be empty'})

            // Template new picture
            const newPicture: IPicture = {
                id: Pictures.length,
                name: req.body.name,
                category: req.body.category,
                availability: req.body.availability || "in stock",
                type: req.body.type || "",
                size: req.body.size || "",
                image: req.body.image || "https://www.imgonline.com.ua/examples/bee-on-daisy.jpg"
            }

            
            // Write in file
            const pictures = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
            pictures.reverse().push(newPicture)
            pictures.reverse()
            fs.writeFileSync(filePath, JSON.stringify(pictures))

            console.log(pictures)
            

            return res.status(200).json({
                data: [...pictures],
                error: null
            })
        } catch (error) {
            return res.status(500).json({
                data: [],
                error: 'Internal Server Error'
            })
        }
    },

    edit: (req: Request, res: Response): Response<IPictureResponse, Record<string, any>> => {
        try {
            return res.status(200).json({
                data: [],
                error: null
            })
        } catch (error) {
            return res.status(500).json({
                data: [],
                error: 'Internal Server Error'
            })
        }
    },

    remove: (req: Request, res: Response): Response<IPictureResponse, Record<string, any>> => {
        try {
            return res.status(200).json({
                data: [],
                error: null
            })
        } catch (error) {
            return res.status(500).json({
                data: [],
                error: 'Internal Server Error'
            })
        }
    }
}