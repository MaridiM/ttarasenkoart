import { Request, Response } from "express"
import fs from "fs"
import path from "path"
import '../../../db/gallery.json'
import { IPicture, IPictureController, IPictureResponse } from "../types"
import cloudinary from 'cloudinary'
import { REACT_APP_CLOUDINARY_API_KAY, REACT_APP_CLOUDINARY_API_SECRET, REACT_APP_CLOUDINARY_CLOUD_NAME, REACT_APP_CLOUDINARY_UPLOAD_PRESET } from "./../../../config"


const filePathPicture = path.join(__dirname, './../../../db/gallery.json')
const filePathCategory = path.join(__dirname, './../../../db/category.json')

cloudinary.v2.config({ 
  cloud_name: REACT_APP_CLOUDINARY_CLOUD_NAME, 
  api_key: REACT_APP_CLOUDINARY_API_KAY, 
  api_secret: REACT_APP_CLOUDINARY_API_SECRET,
  secure: true
});

export const PictureController: IPictureController = {
    main: (req: Request, res: Response): Response<IPictureResponse, Record<string, any>>  => {
        try {
            // Read file
            const pictures = JSON.parse(fs.readFileSync(filePathPicture, 'utf-8'))
            if(pictures.length) {
                return res.status(200).json({
                    data: pictures,
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

    add: async (req: Request, res: Response): Promise<Response<IPictureResponse, Record<string, any>>> => {
        try {
            
            // Read file
            const pictures = JSON.parse(fs.readFileSync(filePathPicture, 'utf-8'))
            const categories = JSON.parse(fs.readFileSync(filePathCategory, 'utf-8'))
            
            // Validation required inputs
            if ( req.body.name === '' ) return res.status(200).json({data: [...pictures], error: 'Title can not be empty'})
            if ( req.body.category === '' ) return res.status(200).json({data: [...pictures], error: 'Category can not be empty'})
            if ( req.body.category.toLowerCase() === 'all' ) return res.status(200).json({data: [...pictures], error: 'Category can not be all'})
            if ( req.body.image === '' ) return res.status(200).json({data: [...pictures], error: 'Image can not be empty'})

            // Add category if it not existing
            const category = categories.filter(c => c.id === String(req.body.category.toLowerCase().replace(' ', '-')))
            if(!category.length) {
                categories.push({
                    id: String(req.body.category.toLowerCase().replace(' ', '-')),
                    name: req.body.category
                })
                fs.writeFileSync(filePathCategory, JSON.stringify(categories))
            }
            // Template new picture
            const newPicture: IPicture = {
                id: pictures.length+1,
                name: req.body.name,
                category: String(req.body.category.toLowerCase().replace(' ', '-')),
                availability: req.body.availability || "in stock",
                type: req.body.type || "",
                size: req.body.size || "",
                image: ''
            }
            

            await cloudinary.v2.uploader.unsigned_upload(
                req.body.image, 
                REACT_APP_CLOUDINARY_UPLOAD_PRESET, 
                { resource_type: "image" },
                (error, result) => {
                    newPicture.image = result.secure_url
                }
            )
                
                
            pictures.reverse().push(newPicture)
            pictures.reverse()
            
            // Write in file
            fs.writeFileSync(filePathPicture, JSON.stringify(pictures))

            return res.status(201).json({
                data: {
                    picture: newPicture,
                    category: {
                        id: String(req.body.category.toLowerCase().replace(' ', '-')),
                        name: req.body.category
                    }
                },
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
            
            
            // Write in file
            const pictures = JSON.parse(fs.readFileSync(filePathPicture, 'utf-8'))
            const categories = JSON.parse(fs.readFileSync(filePathCategory, 'utf-8'))
            const picture = pictures.filter(pict => String(pict.id) === req.params.id)[0]
            
            // Validation required inputs
            if ( req.body.name === '' ) return res.status(200).json({data: [...pictures], error: 'Title can not be empty'})
            if ( req.body.category === '' ) return res.status(200).json({data: [...pictures], error: 'Category can not be empty'})
            if ( req.body.category.toLowerCase() === 'all' ) return res.status(200).json({data: [...pictures], error: 'Category can not be all category, please change other'})
            if ( req.body.image === '' ) return res.status(200).json({data: [...pictures], error: 'Image can not be empty'})
            
            // Add category if it not existing
            const category = !!categories.filter(c => c.id === String(req.body.category.toLowerCase()))

            if(!category) {
                categories.push({
                    id: String(req.body.category.toLowerCase().replace(' ', '-')),
                    name: req.body.category
                })
                fs.writeFileSync(filePathCategory, JSON.stringify(categories))
            }

            // Template new picture
            const newPicture: IPicture = {
                id: picture.id,
                name: req.body.name || picture.name,
                category: String(req.body.category.toLowerCase().replace(' ', '-')) || picture.category,
                availability: req.body.availability || picture.availability,
                type: req.body.type || picture.type,
                size: req.body.size || picture.size,
                image: req.body.image || picture.image,
            }

            const newPictures = pictures.map(pict => {
                if(pict.id === picture.id) {
                    return pict = { ...newPicture }
                }
                return pict
            })

            // Write in file
            fs.writeFileSync(filePathPicture, JSON.stringify(newPictures))

            return res.status(200).json({
                data: {
                    picture: newPicture,
                    category: {
                        id: String(req.body.category.toLowerCase().replace(' ', '-')),
                        name: req.body.category
                    }
                },
                error: null
            })
        } catch (error) {
            return res.status(500).json({
                data: [],
                error: 'Internal Server Error'
            })
        }
    },

    remove: async (req: Request, res: Response): Promise<Response<IPictureResponse, Record<string, any>>> => {
        try {
            // Write in file
            const pictures = JSON.parse(fs.readFileSync(filePathPicture, 'utf-8'))
            const categories = JSON.parse(fs.readFileSync(filePathCategory, 'utf-8'))
            
            
            
            // Remove Picture
            const newPictures = pictures.filter(pict => String(pict.id) !== req.params.id)
            
            // Remove categories if they dont have picture
            const categoryIDs = categories.map(c => c.id)
            const picturesCategory = newPictures.map( pict => pict.category)
            
            categoryIDs.map(c => {
                if (!picturesCategory.includes(c)) {
                    const newCategories = categories.filter(cat => cat.id !== c)

                    fs.writeFileSync(filePathCategory, JSON.stringify(newCategories))
                }
                return
            })

            const imageName = pictures.filter(pict => String(pict.id) === req.params.id)[0].image.split('/')

            await cloudinary.v2.uploader.destroy(
                `ttarasenkoart/${imageName[imageName.length - 1].split('.')[0]}`,
                { resource_type: "image" },
            )

            // Write in file
            await fs.writeFileSync(filePathPicture, JSON.stringify(newPictures))
            
            return res.status(200).json({
                data: [...newPictures],
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