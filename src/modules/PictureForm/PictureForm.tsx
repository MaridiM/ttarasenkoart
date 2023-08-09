import { ChangeEvent, FC } from 'react'
import { TextField } from '@mui/material' 
import { PhotoInput } from 'components'
import { SelectInput } from 'components/SelectInput'
import { Link } from 'react-router-dom'
import { paths } from 'paths'
import sass from './styles.module.sass'
import { TCategory, TPictureForm } from 'types'

type TProps = {
    availability: TCategory[]
    categories: TCategory[]
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    form: TPictureForm
    path: string
    pictureID: string | number 
    editPicture: (id: string | number, data: TPictureForm) => void
    addPicture: (data: TPictureForm) => void
    onSubmit: (e, action: any, id?: string | number) => void
}


const PictureForm: FC<TProps>  = ({
    availability,
    categories,
    onChange,
    form,
    path,
    pictureID,
    editPicture,
    addPicture,
    onSubmit
}) => {
    return (
        <div className={sass.form} >
            <div className={sass.img}>
                <PhotoInput
                    uploading={form.uploading}
                    fileUrl={form.image}
                    onChange={onChange}
                    required
                />
            </div>
            <div className={sass.body}>
               <header>
                    <h4>{ path === paths.add ? 'Add picture' : 'Update picture' }</h4>
                    {/* { path !== paths.add && <span>ID: {pictureID}</span>} */}
                </header>
                 <div className={sass.inputGroup}>
                    <TextField
                        required
                        name='name'
                        label='Title'
                        variant='outlined'
                        value={form.name}
                        onChange={onChange}
                        className={sass.input}
                        />
                    <SelectInput 
                        name='category'
                        label='Category'
                        items={categories.slice(1)}
                        value={form.category}
                        onChange={onChange}
                        addBtn
                    />
                    <SelectInput 
                        name='availability'
                        label='Availability'
                        items={availability}
                        value={form.availability}
                        onChange={onChange}
                    />
                    <TextField
                        name='type'
                        label='Type'
                        variant='outlined'
                        value={form.type}
                        onChange={onChange}
                        className={sass.input}
                    />
                    <TextField
                        name='size'
                        label='Size'
                        variant='outlined'
                        value={form.size}
                        onChange={onChange}
                        className={sass.input}
                    />
                </div>
                <footer>
                    <button 
                        type="submit" 
                        className={sass.btn}
                        onClick={(e) => 
                            path === paths.add ? onSubmit(e, addPicture) : onSubmit(e, editPicture, pictureID)
                        }
                    >{ path === paths.add ? 'Add picture' : 'Update picture' }</button>
                    <Link 
                        to={paths.gallery}
                        className={sass.link}
                    >Cancel</Link>
                </footer> 
            </div>
        </div>
    )
}

export default PictureForm
