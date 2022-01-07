import { ICategory } from './../../categories/types.d';
import { Request, Response } from "express"
import '../../../db/gallery.json'
import { IPicture, IPictureController, IPictureResponse } from "../types"
import cloudinary from 'cloudinary'
import {
    REACT_APP_CLOUDINARY_API_KAY,
    REACT_APP_CLOUDINARY_API_SECRET,
    REACT_APP_CLOUDINARY_CLOUD_NAME,
    REACT_APP_CLOUDINARY_UPLOAD_PRESET
} from "./../../../config"

import { Picture } from "../models"
import { Category } from "../../categories/models"


cloudinary.v2.config({ 
  cloud_name: REACT_APP_CLOUDINARY_CLOUD_NAME, 
  api_key: REACT_APP_CLOUDINARY_API_KAY, 
  api_secret: REACT_APP_CLOUDINARY_API_SECRET,
  secure: true
});

export const PictureController: IPictureController = {
    main: async (req: Request, res: Response): Promise<Response<IPictureResponse, Record<string, any>>>  => {
        try {
            // Get Data from db
            const pictures = await Picture.find({})
            if(pictures.length) {
                return res.status(200).json({
                    data: pictures.map(({_id, name, category, availability, type, size, image}) => ({
                        id: _id, name, category, availability, type, size, image 
                })).reverse(),
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
            
            // Get Data from db
            const pictures = await Picture.find({})
            
            
            let pictList
            if(pictures.length) {
                    pictList = pictures.map(({_id, name, category, availability, type, size, image}) => ({
                        id: _id, name, category, availability, type, size, image 
                }))
            }
            
            // Validation required inputs
            if ( req.body.name === '' ) return res.status(200).json({data: [...pictList], error: 'Title can not be empty'})
            if ( req.body.category === '' ) return res.status(200).json({data: [...pictList], error: 'Category can not be empty'})
            if ( req.body.category.toLowerCase() === 'all' ) return res.status(200).json({data: [...pictList], error: 'Category can not be all'})
            if ( req.body.image === '' ) return res.status(200).json({data: [...pictList], error: 'Image can not be empty'})
            



            // Add category if it not existing
            const currentCategory = String(req.body.category
                .toLowerCase())
                .split('')
                .map( c => c === ' ' ? c = '-' : c)
                .join('')

            const category = await Category.find({id: currentCategory})

            // Add category if it not existing
            if(!category.length) {
                const newCategory = {
                    id: currentCategory,
                    name: req.body.category
                }
                await Category.create(newCategory)
            }


            // Template new picture
            const newPicture: IPicture = {
                name: req.body.name,
                category: currentCategory,
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
                
                
            const addedPicture = await Picture.create(newPicture)
            newPicture.id = addedPicture._id
            const updatedCategories = await Category.find({})

            return res.status(201).json({
                data: {
                    picture: newPicture,
                    categories: updatedCategories
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

    edit: async (req: Request, res: Response): Promise<Response<IPictureResponse, Record<string, any>>> => {
        try {
             // Get Data from db
            const pictures = await Picture.find({})
            
            
            let pictList
            if(pictures.length) {
                pictList = pictures.map(({_id, name, category, availability, type, size, image}) => ({
                    id: _id, name, category, availability, type, size, image 
                }))
            }
            const picture =  await Picture.findById({_id: req.params.id})
            
            // Validation required inputs
            if ( req.body.name === '' ) return res.status(200).json({data: [...pictList], error: 'Title can not be empty'})
            if ( req.body.category === '' ) return res.status(200).json({data: [...pictList], error: 'Category can not be empty'})
            if ( req.body.category.toLowerCase() === 'all' ) return res.status(200).json({data: [...pictList], error: 'Category can not be all category, please change other'})
            if ( req.body.image === '' ) return res.status(200).json({data: [...pictList], error: 'Image can not be empty'})
            
            // Add category if it not existing
            const currentCategory = String(req.body.category
                .toLowerCase())
                .split('')
                .map( c => c === ' ' ? c = '-' : c)
                .join('')

            const category = await Category.find({id: currentCategory})

            // Template new picture
            const newPicture: IPicture = {
                name: req.body.name || picture.name,
                category: currentCategory || picture.category,
                availability: req.body.availability || picture.availability,
                type: req.body.type || picture.type,
                size: req.body.size || picture.size,
                image: req.body.image || picture.image,
            }

            // Write in file
            await Picture.findByIdAndUpdate({_id: picture.id}, newPicture)
            const updatedPicture = await Picture.findById({_id: picture.id})
            newPicture.id = updatedPicture._id
            const updatedPictures = await Picture.find({})
            
            
            // Add in JSON if category is exist
            // **** //
            
            const categories = await Category.find({})
            const updatedCategories: ICategory[] = []
            
            if(!category.length) {
                const newCategory = {
                    id: currentCategory,
                    name: req.body.category
                }
                await Category.create(newCategory)
            } else{
                // Check by superfluous category 
                const noSuperfluousCats: any[] = []
                for(let i = 0; i < categories.length; i++) {
                    for(let j = 0; j < updatedPictures.length; j++) {
                        if(categories[i].id === updatedPictures[j].category) {
                            noSuperfluousCats.push(categories[i])
                        }
                    }
                }
                
                
                categories.map( async c => {
                    const nsCategory = noSuperfluousCats.filter(nsc => nsc.id === c.id)
                    if (nsCategory.length !== 0 ) {
                        return updatedCategories.push(c)
                    } 
                    await Category.findOneAndRemove({id: c.id})
                    return 
                    
                })
            }
            // **** //
            const allUpdatedCategories = await Category.find({})
            return res.status(200).json({
                data: {
                    picture: newPicture,
                    categories: !updatedCategories.length ? allUpdatedCategories : updatedCategories
                },
                error: null
            })

        } catch (error) {
            console.log(error)

            return res.status(500).json({
                data: [],
                error: 'Internal Server Error'
            })
        }
    },

    remove: async (req: Request, res: Response): Promise<Response<IPictureResponse, Record<string, any>>> => {
        try {
            const removedPictByID = await Picture.findById({_id: req.params.id})
                        
            const imageName = removedPictByID.image.split('/')

            await cloudinary.v2.uploader.destroy(
                `ttarasenkoart/${imageName[imageName.length - 1].split('.')[0]}`,
                { resource_type: "image" },
            )

            // Write in file
            await Picture.findByIdAndRemove({_id: req.params.id})

             // Remove categories if they dont have picture
            const existCategory = await Category.find({id: removedPictByID.category}).exec()
            const existRemovedPictureCategory = await Picture.find({category: removedPictByID.category}).exec()
            
            if (existRemovedPictureCategory.length === 0 && existCategory.length !== 0) {
                await Category.findOneAndRemove({id: removedPictByID.category})
            }
            const allPict = await Picture.find({})
            const allCategories = await Category.find({})

            return res.status(200).json({
                data: {
                    pictures: allPict,
                    categories: allCategories
                },
                error: null
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                 data: {
                    picture: [],
                    categories: []
                },
                error: 'Internal Server Error'
            })
        }
    }
}