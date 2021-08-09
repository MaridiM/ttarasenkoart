import { NextFunction, Request, Response } from "express";

export interface ICategoryController {
    main: (request: Request, response: Response, next?: NextFunction) => Response<ICategoryResponse, Record<string, any>>
}

export interface ICategory {
    id: string
    name: string
}

export interface ICategoryResponse {
    data: ICategory[] | []
    error: string | null
}