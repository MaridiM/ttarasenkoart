import { FC, useState } from 'react'
import { TextField} from '@material-ui/core' 
import { PhotoInput } from 'components'
import sass from './styles.module.sass'
import { toast } from 'react-toastify'

type TProps = {}
// type TErrorState = {}
type TCategory = {
    id: string
    name: string
}
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
    const [ showSelectList, setShowSelectList ] = useState<boolean>(false)
    const [form, setForm] = useState<TFormState>({
        name: '',
        category: '',
        availability: '',
        type: '',
        size: '',
        image: '',
        uploading: false,
        file: undefined
    })
    const [
        categories, 
        // setCategories
    ] = useState<TCategory[]>([
        {
            "id" : "all",
            "name" : "All"
        },
        {
            "id" : "stil-life",
            "name" : "Stil Life"
        },
        {
            "id" : "nude",
            "name" : "Nude"
        },
        {
            "id": "portrait",
            "name": "Portrait"
        },
        {
            "id": "drawing",
            "name": "Drawing"
        },
        {
            "id": "figurative",
            "name": "Figurative"
        }
    ])

    // const [error, setError] = useState<TErrorState[]>([

    // ])
    const onChange = async (e) => {
        const { name, value, files } = e.target
        
        if(files) {
            setForm( state => ({
                ...state,
                uploading: true
            }))
            // Reading file for  showing in browser before upload
            let fReader = new FileReader();
            fReader.readAsDataURL(e.target.files[0]);
            fReader.onloadend = function(e){
                setForm( state => ({
                    ...state,
                    image: String(e.target!.result) || '',
                    uploading: false,
                    file: files[0]
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
        if(form.name || form.image || form.category)
        toast.error('Its work?')
    } 


    const onFocus = (): void => {
        setShowSelectList(true)
    }
    const onBlur = (): void => {
        setShowSelectList(false)
    }
    const onClick = (item: any): void => {
        console.log(item)
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
                <div className={sass.select}>
                    <TextField
                        required
                        name='category'
                        label='Category'
                        variant='outlined'
                        value={form.category}
                        onChange={onChange}
                        className={sass.input}
                        autoComplete='off'
                        onFocus={onFocus}
                        onBlur={onBlur}
                    />
                    {
                        showSelectList && (
                            <ul className={sass.selectList}>
                                {
                                    categories!.map((category => (
                                        <li 
                                            key={category.id} 
                                            className={sass.selectItem}
                                            onClick={() => onClick(category.id)}
                                        >
                                            {category.name}
                                        </li>
                                    )))}
                                
                            </ul>
                        )
                    }

                </div>
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
                <button type="submit" onClick={onSubmit}>Upload</button>
            </div>
            
        </div>
    )
}

export default AddPicture
