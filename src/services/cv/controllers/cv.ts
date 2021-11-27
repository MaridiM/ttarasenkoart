import { Response, Request } from 'express';
import path from 'path';
import fs from 'fs';
import { ICvController, ICvResponse } from './../types.d';

const filePathCv = path.join(__dirname, './../../../db/cv.json')

export const CvController: ICvController = {
    main: (req: Request, res: Response): Response<ICvResponse, Record<string, any>>  => {
        try {
            // Read file
            const cv = JSON.parse(fs.readFileSync(filePathCv, 'utf-8'))

            if(!cv.length) return res.status(200).json({data: [], error: null}) 
            
            return res.status(200).json({
                data: cv,
                error: null
            })
        } catch (error) {           
             return res.status(500).json({data: [], error: 'Server error'})
        }
    },
    add: async (req: Request, res: Response): Promise<Response<ICvResponse, Record<string, any>>> => {
        try {
            if(JSON.stringify(req.body) !== '{}' || req.body.text){
                const { dateFrom, dateTo, now, text } = req.body

                const newCv = {
                    id: String(Math.floor(Math.random()*1000000*16)),
                    dateFrom: dateFrom || null,
                    dateTo: dateTo || null,
                    now: now || false,
                    text
                }

                // Read file
                const cv = JSON.parse(fs.readFileSync(filePathCv, 'utf-8'))

                if(!cv) return res.status(500).json({
                    data: [],
                    error: 'Server error | Invalid read CV Data |'
                })

                cv.push(newCv)

                // Write in file
                fs.writeFileSync(filePathCv, JSON.stringify(cv))

                return res.status(200).json({
                    data: cv,
                    error: null
                })
            }
            return res.status(204).json({
                data: [],
                error: 'Write text field, text can\'t be empty'
            })


        } catch (error) {           
             return res.status(500).json({data: [], error: 'Server error'})
        }
    },
    update: (req: Request, res: Response): Response<ICvResponse, Record<string, any>> => {
        try {
            if(JSON.stringify(req.body) !== '{}' ){
                const { dateFrom, dateTo, now, text } = req.body
                
                // Read file
                const cv = JSON.parse(fs.readFileSync(filePathCv, 'utf-8'))
    
                if(!cv) return res.status(500).json({
                    data: [],
                    error: 'Server error | Invalid read CV Data |'
                })

                const newCv = {
                    id: cv.id,
                    dateFrom: cv.dateFrom || dateFrom,
                    dateTo: cv.dateTo || dateTo,
                    now: cv.now || now,
                    text: cv.text || text,
                }

                const cvUpdatedData = cv.map(item => {
                    if(item.id === req.params.id) {
                        return item = { ...newCv }
                    }
                    return item
                })

                 // Write in file
                fs.writeFileSync(filePathCv, JSON.stringify(cvUpdatedData))

                return res.status(200).json({
                    data: cvUpdatedData,
                    error: null
                })

            }
            return res.status(200).json({
                data: [], 
                error: 'Fields can not be empty' 
            }) 
        } catch (error) {           
             return res.status(500).json({data: [], error: 'Server error'})
        }
    },
    remove: async (req: Request, res: Response): Promise<Response<ICvResponse, Record<string, any>>> => {
        try {
            // Read file
            const cv = JSON.parse(fs.readFileSync(filePathCv, 'utf-8'))
            
            if(!cv) return res.status(500).json({
                data: [],
                error: 'Server error | Invalid read CV Data |'
            })
            
            const currentCv = cv.filter(item => item.id !== req.params.id)
            
            // Write in file
            fs.writeFileSync(filePathCv, JSON.stringify(currentCv))

            return res.status(200).json({data: currentCv, error: null}) 
            
        } catch (error) {           
             return res.status(500).json({data: [], error: 'Server error'})
        }
    },
}