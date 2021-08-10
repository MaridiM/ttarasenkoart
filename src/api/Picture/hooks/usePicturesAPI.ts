import { paths } from 'paths';
import { ReactText, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { TPicture, TPictureForm } from "types"
import { pictureAPI } from '../pictures'

type TUsePictureAPI = {
    getPicture: (id: string | number) => Promise<void>
    addPicture: (dataForm: TPictureForm) => Promise<ReactText>
    editPicture: (id: string | number, dataForm: TPictureForm) => Promise<ReactText>
    removePicture: (id: string | number) => Promise<void>
    picture: TPicture
    pictures: TPicture[]
}

export const usePicturesAPI = (): TUsePictureAPI => {
    const [picture, setPicture] = useState<TPicture>({
            id: '',
            name: '',
            category: '',
            availability: '',
            type: '',
            size: '',
            image: ''
    })
    const [ pictures, setPictures] = useState<TPicture[]>([])

    useEffect(() => {
        pictureAPI.pictures()
            .then(({data: {data}}) => setPictures(state => [...state, ...data]))
    }, [setPictures])

   

    const getPicture = async (id: string | number): Promise<void> => {
        const { data: { data }} = await pictureAPI.picture(id)
        setPicture( state => ({...state, ...data}))
    }

    const addPicture = async (dataForm: TPictureForm): Promise<ReactText> => {
        const {data: { data }} = await pictureAPI.add(dataForm) 
        setPictures(state => [...state, ...data])
        if (!data) {
            toast.error('Error adding picture')
            return document.location.pathname = paths.admin 
        } 
        toast.success('Picture added successfully')
        return document.location.pathname = paths.admin
        
    }

    const editPicture = async (id: string | number, dataForm: TPictureForm): Promise<ReactText> => {
       const {data: { data }} = await pictureAPI.edit(id, dataForm) 
        setPictures(state => [...state, ...data])
        if (!data) {
            toast.error('Error update picture')
            return document.location.pathname = paths.admin 
        } 
        toast.success('Picture updated successfully')
        return document.location.pathname = paths.edit(data.id) 
    }

    const removePicture = async (id: string | number): Promise<void> => {
        const {data: { data }} = await pictureAPI.remove(id)
        setPictures(state => [...state, ...data])
    }


    return {
        getPicture,
        addPicture,
        editPicture,
        removePicture,
        picture,
        pictures,
    }
}