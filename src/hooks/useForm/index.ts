// import { axios } from "api"
// import { 
//     REACT_APP_CLOUDINARY_API_KAY,
//     REACT_APP_CLOUDINARY_API_URL,
//     REACT_APP_CLOUDINARY_UPLOAD_PRESET
// } from "config"
import { ChangeEvent, useState } from "react"


export const useForm = <T> (initialForm: T) => {
    const [form, setForm] = useState<T>(initialForm)
    // const [ fData, setFData ] = useState<any>({})

    // const uploadFile = async (data: FormData): Promise<void> => {
    //     // Upload file on Cloudinary
    //     const {data: { secure_url }} = await axios.post(REACT_APP_CLOUDINARY_API_URL, data)
    //     if (secure_url) {
    //         // Set Photo in state from cloudinary
    //         setForm( state => ({
    //             ...state,
    //             image: secure_url,
    //             uploading: false,
    //         }))
    //     } 
    // }

    const onChange = async (e: ChangeEvent<any>): Promise<void>=> {
        const { name, value, files } = e.target
        
        if(files) {
            setForm( state => ({
                ...state,
                uploading: true
            }))

            let fReader = new FileReader();
            
            fReader.readAsDataURL(e.target.files[0]);
            fReader.onloadend = async (e) =>{
                // Append file on FormData
                const formData = new FormData()
                formData.append('file', files[0])
                // formData.append('api_kay', REACT_APP_CLOUDINARY_API_KAY)
                // formData.append('upload_preset', REACT_APP_CLOUDINARY_UPLOAD_PRESET)
                formData.append('timestamp', String(Date.now() / 1000))
                
                setForm( state => ({
                    ...state,
                    image: String(e.target!.result) || '',
                    uploading: false,
                }))
                // setFData(formData)

            }
            
            // Reading file for showing in browser before upload, send to server
            // let fReader = new FileReader();
            
            // fReader.readAsDataURL(e.target.files[0]);
            // fReader.onloadend = function(e){
            //     setForm( state => ({
            //         ...state,
            //         image: String(e.target!.result) || '',
            //         uploading: false,
            //         file: files[0]
            //     }))
            // } 
        }

        setForm( state => ({
            ...state,
            [name]: value
        }))
    } 
    const onSubmit = async (e, action: any, id?: string | number): Promise<void> => {
        e.preventDefault()
        // await uploadFile(fData)
        if (!id ) return action(form)
        return action(id, form)
    }
    return {
        form,
        setForm,
        onChange,
        onSubmit,
    }
}