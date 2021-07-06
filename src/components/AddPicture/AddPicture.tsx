import { FC, useState } from 'react'
import { TextField } from '@material-ui/core' 
import { PhotoInput } from 'components'
import sass from './styles.module.sass'

type TProps = {}
type TFormState = {
    name: string
    category: string
    availability: string
    type: string
    size: string
    image: string
    uploading: boolean
    file?: Blob
}
const AddPicture: FC<TProps>  = () => {
    const [form, setForm] = useState<TFormState>({
        name: '',
        category: '',
        availability: '',
        type: '',
        size: '',
        image: '',
        uploading: false,
    })
    const onChange = async (e) => {
        const { name, value, files } = e.target
        
        if(files) {
            console.log(files)
            setForm( state => ({
                ...state,
                uploading: true
            }))
            // Append file on FormData
            const formData = new FormData()
            formData.append('file', files[0])
            console.log(formData)
            // Upload file on Cloudinary
            if (formData) {
                // Set Photo in state from cloudinary
                setForm( state => ({
                    ...state,
                    uploading: false,
                }))
            }
        }

        setForm( state => ({
            ...state,
            [name]: value
        }))
    } 
    const onSubmit = (e) => {
        e.preventDefault()
        console.log(form)
    } 
    
    return (
        <div className={sass.form} >
            <PhotoInput
                uploading={form.uploading}
                fileUrl={form.image}
                onChange={onChange}
                required
            />
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
                <TextField
                    required
                    name='category'
                    label='Category'
                    variant='outlined'
                    value={form.category}
                    onChange={onChange}
                    className={sass.input}
                    />
                <TextField
                    name='availability'
                    label='Availability'
                    variant='outlined'
                    value={form.availability}
                    onChange={onChange}
                    className={sass.input}
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
                <button type="submit" onClick={() => onSubmit}>Upload</button>
            </div>
            
        </div>
    )
}

export default AddPicture
