// Core
import { ChangeEvent, FC, MouseEventHandler, useRef } from 'react'
import sass from './styles.module.sass'

// Styled

// Types
interface IProps {
    uploading: boolean
    fileUrl: string
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
    required?: boolean
}

const PhotoInput: FC<IProps> = ({ uploading, fileUrl, onChange, required}) => {
    const uploadInputRef = useRef<any>()

    const uploadHandleInput: MouseEventHandler<HTMLButtonElement> = event => {
        event.preventDefault()
        return uploadInputRef.current?.click()
    }
    console.log(fileUrl)

    return (
        <div className={sass.container} >
            <input 
                className={sass.uploadInput} 
                id={'image'} 
                type="file" 
                name='image'
                accept='image/*' 
                onChange={onChange}
                ref={uploadInputRef} 
                required={required}
            />
            <button className={sass.buttonImage} onClick={uploadHandleInput}>
                <div className={sass.image} >
                    { uploading && <i className="fas fa-spinner"></i>}
                    { !uploading && fileUrl 
                            ? <img src={ fileUrl } alt='new_picture'/>
                            : <i className="fas fa-cloud-upload-alt"></i>
                    } 
                </div>
            </button>
        </div>
    )
}

export default PhotoInput
 