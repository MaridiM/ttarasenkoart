import { useForm } from 'hooks'
import { Picture } from 'modules/Picture'
import { PictureForm } from 'modules/PictureForm'
import { paths } from 'paths'
import { FC } from 'react'
import sass from './styles.module.sass'


type TProps = {
    availability: TCategory[]
    categories: TCategory[]
    removePicture: (id: string | number ) => void
    path: string
    picture: TPicture
}
type TCategory = {
    id: string
    name: string
}
type TPicture = {
    id: number | string
    name: string
    category: string
    availability: string
    type: string
    size: string
    image: string
}
type TFormState = {
    id?: string | number
    name: string
    category: string
    availability: string
    type: string
    size: string
    image: string 
    uploading: boolean
    file?: Blob
}

const ModalPages: FC<TProps>  = ({
    availability,
    categories,
    removePicture,
    path, 
    picture
}) => {

    const { form, setForm, onChange, onSubmit } = useForm<TFormState>({
        name: '',
        category: '',
        availability: 'In stock',
        type: '',
        size: '',
        image: '',
        uploading: false,
        file: undefined
    })  
    const getDataBeforeUpdate = (): void => {
        const c = categories.filter(p => p.id === picture.category)[0]
        const a = availability.filter(p => p.id === picture.availability.toLowerCase())[0]
        setForm(state => ({
            ...state,
            name: picture.name,
            category: c.name,
            availability: a.name,
            type: picture.type,
            size: picture.size,
            image: picture.image,
        }))
    }

    return (
        <div className={sass.modal_blur}>
            <div className={sass.modal_window}>
                {
                    path === paths.picture(picture.id) && <Picture
                        picture={picture}
                        removePicture={removePicture}
                        getDataBeforeUpdate={getDataBeforeUpdate}
                    />
                }
                {
                    (path === paths.add || path === paths.edit(picture.id)) && <PictureForm 
                        availability={availability} 
                        categories={categories} 
                        onChange={onChange} 
                        onSubmit={onSubmit} 
                        form={form} 
                        pictureID={picture.id}
                        path={path}
                    />
                }
            </div>
        </div>
    )
}

export default ModalPages
