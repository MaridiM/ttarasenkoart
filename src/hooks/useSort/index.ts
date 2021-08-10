import { useEffect, useState } from 'react';
import { TPicture } from 'types';


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
    }, [sort, data])
    
    return {
        sort,
        setSort,
        pictures
    }
    
}