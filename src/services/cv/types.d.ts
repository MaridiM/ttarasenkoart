import { NextFunction, Request, Response } from "express";

export interface ICvController {
    main: (request: Request, response: Response, next?: NextFunction) => Response<ICvResponse, Record<string, any>>
    add: (request: Request, response: Response, next?: NextFunction) =>  Promise<Response<ICvResponse, Record<string, any>>>
    update: (request: Request, response: Response, next?: NextFunction) => Response<ICvResponse, Record<string, any>>
    remove: (request: Request, response: Response, next?: NextFunction) => Promise<Response<ICvResponse, Record<string, any>>>
}

export interface ICv {
    id: string | number
    dateFrom: number | null
    dateTo: number | null
    now: boolean,
    text: string
    
}

export interface ICvResponse {
    data: ICv[] | ICv | null
    error: string | null
}