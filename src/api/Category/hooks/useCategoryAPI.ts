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
    const [categories, setCategories ] = useState<TCategory[]>([])
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
            .then(async ({data: { data }}) => {
                setLoading(true)
                setCategories([...data])
                console.log(data)
                setLoading(false)
            })
            .catch(({ response: { data: { data, error }}}) => {
                setCategories([...data])
                toast.error(error)
            })
    }, [])

    return {
        categories,
        availability,
        loading
    }
} 