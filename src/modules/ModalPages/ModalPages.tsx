import { useForm } from 'hooks'
import { Picture } from 'modules/Picture'
import { PictureForm } from 'modules/PictureForm'
import { paths } from 'paths'
import { FC } from 'react'
import { TCategory, TPicture, TPictureForm, TStateRemovePicture } from 'types'
import sass from './styles.module.sass'


type TProps = {
    availability: TCategory[]
    categories: TCategory[]
    removePicture: (id: string | number ) => void
    editPicture: (id: string | number, data: TPictureForm) => void
    addPicture: (data: TPictureForm) => void
    path: string
    picture: TPicture
    setRemovePictureState: (value: TStateRemovePicture) => void
}

const ModalPages: FC<TProps>  = ({
    availability,
    categories,
    removePicture,
    editPicture,
    addPicture,
    path, 
    picture,
    setRemovePictureState
}) => {

    const { form, setForm, onChange, onSubmit } = useForm<TPictureForm>({
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
                    path === paths.picture(String(picture.id)) && <Picture
                        picture={picture}
                        removePicture={removePicture}
                        getDataBeforeUpdate={getDataBeforeUpdate}
                        setRemovePictureState={setRemovePictureState}
                    />
                }
                {
                    (path === paths.add || path === paths.edit(picture.id)) && <PictureForm 
                        availability={availability} 
                        categories={categories} 
                        addPicture={addPicture}
                        editPicture={editPicture}
                        onChange={onChange} 
                        form={form} 
                        pictureID={picture.id}
                        onSubmit={onSubmit}
                        path={path}
                    />
                }
            </div>
        </div>
    )
}

export default ModalPages