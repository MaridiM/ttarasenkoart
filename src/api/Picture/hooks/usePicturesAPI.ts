import { paths } from 'paths';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { TPicture, TPictureForm } from "types"
import { pictureAPI } from '../pictures'

type TUsePictureAPI = {
    getPictures: () => Promise<void>
    getPicture: (id: string | number) => Promise<void>
    addPicture: (dataForm: TPictureForm) => Promise<void>
    editPicture: (id: string | number, dataForm: TPictureForm) => Promise<void>
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
    }, [pictures])


    const getPictures = async (): Promise<void> => {
         pictureAPI.pictures()
            .then(({data: {data}}) => setPictures(state => [...state, ...data]))
    }
    const getPicture = async (id: string | number): Promise<void> => {
        const { data: { data }} = await pictureAPI.picture(id)
        setPicture( state => ({...state, ...data[0]}))
    }

    const addPicture = async (dataForm: TPictureForm): Promise<void> => {
        pictureAPI.add(dataForm)
        .then(({data: { data, error }}) => {
            setPicture(state => ({...state, ...data}))
            if (error) {
                toast.error(error)
                return
            } 
            toast.success('Picture added successfully')
            setTimeout(() => {
                document.location.pathname = paths.admin 
            }, 2000)
            return
        })
        .catch(({response}) => {
            console.log(response.data)
        })
        // const {data: { data, error }} = await pictureAPI.add(dataForm) 
        // setPicture(state => ({...state, ...data}))

        // if (error) {
        //     toast.error(error)
        //     return
        // } 
        // toast.success('Picture added successfully')
        // setTimeout(() => {
        //     document.location.pathname = paths.admin 
        // }, 5000)
        // return
        
    }

    const editPicture = async (id: string | number, dataForm: TPictureForm): Promise<void> => {
        const {data: { data, error }} = await pictureAPI.edit(id, dataForm)
        
        setPictures(state => [...state, ...data])
        if (error) {
            toast.error(error)
            return
        } 
        toast.success('Picture updated successfully')
        setTimeout(() => {
            document.location.pathname = paths.edit(data.id) 
        }, 2000)
        return
    }

    const removePicture = async (id: string | number): Promise<void> => {
        const {data: { data }} = await pictureAPI.remove(id)
        setPictures(state => [...state, ...data])
        document.location.pathname = paths.gallery
    }


    return {
        getPictures,
        getPicture,
        addPicture,
        editPicture,
        removePicture,
        picture,
        pictures,
    }
}