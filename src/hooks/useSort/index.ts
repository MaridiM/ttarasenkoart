import { useEffect, useState } from 'react';

type TPicture = {
    id: number | string
    name: string
    category: string
    availability: string
    type: string
    size: string
    image: string
}

export const useSort = (data: TPicture[]) => {
    const [ sort, setSort ] = useState<string>('all')
    const [ pictures, setPictures ] = useState<TPicture[]>([])

    useEffect(() => {
        if (sort.toLowerCase() === 'all') {
            setPictures([...data])
        } else if (sort.toLowerCase() === 'sold' || sort.toLowerCase() === 'in stock') {
            const res = data.filter(p => p.availability.toLowerCase() === sort)
            setPictures([...res])
        } else {
            const res = data.filter(p => p.category === sort)
            setPictures([...res])
        }
    }, [sort])
    
    return {
        sort,
        setSort,
        pictures
    }
    
}