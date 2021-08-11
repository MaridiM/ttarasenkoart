import { categoryAPI } from './../categories';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { TCategory } from 'types';

type TUseCategoryApi = {
    readonly loading: boolean
    readonly categories: TCategory[]
    readonly availability: TCategory[]
}


export const useCategoryAPI = (): TUseCategoryApi => { 
    const [loading, setLoading ] = useState<boolean>(false)
    const [categories, setCategories ] = useState<TCategory[]>([
        {
            id: 'all',
            name: 'All'
        }
    ])
    const availability: TCategory[] = [
        {
            "id" : "sold",
            "name" : "Sold"
        },
        {
            "id" : "in stock",
            "name" : "In stock"
        },
    ]

    useEffect(() => {
        categoryAPI.categories()
            .then(({data: { data }}) => {
                setLoading(true)
                setCategories(state => [...state, ...data])
                setLoading(false)
            })
            .catch(({ response: { data: { data, error }}}) => {
                setCategories(state => [...state, ...data])
                toast.error(error)
            })
    }, [])

    return {
        categories,
        availability,
        loading
    }
} 