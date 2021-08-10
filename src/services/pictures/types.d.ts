import { NextFunction, Request, Response } from "express";

export interface IPictureController {
    main: (request: Request, response: Response, next?: NextFunction) => Response<IPictureResponse, Record<string, any>>
    picture: (request: Request, response: Response, next?: NextFunction) => Response<IPictureResponse, Record<string, any>>
    add: (request: Request, response: Response, next?: NextFunction) => Response<IPictureResponse, Record<string, any>>
    edit: (request: Request, response: Response, next?: NextFunction) => Response<IPictureResponse, Record<string, any>>
    remove: (request: Request, response: Response, next?: NextFunction) => Response<IPictureResponse, Record<string, any>>
}

export interface IPicture {
    id: number | string
    name: string
    category: string
    availability?: string
    type?: string
    size?: string
    image?: string
}

export interface IPictureResponse {
    data: IPicture[] | []
    error: string | null
}