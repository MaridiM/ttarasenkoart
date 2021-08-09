import { ChangeEvent, useState } from "react"
// import { toast } from 'react-toastify'


export const useForm = <T> (initialForm: T) => {
    const [form, setForm] = useState<T>(initialForm)

    const onChange = (e: ChangeEvent<any>): void=> {
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
    const onSubmit = (e, action: any):void => {
        e.preventDefault()
        console.log(form)
        action(form)
        // if(form.name || form.image || form.category) toast.error('Its work?')
    }
    return {
        form,
        setForm,
        onChange,
        onSubmit,
    }
}