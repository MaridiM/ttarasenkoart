import { model, Schema } from 'mongoose'

const PictureSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    availability: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: ''
    },
    size: {
        type: String,
        default: ''
    }, 
    image: {
        type: String,
        required: true
    }
})

export default model( 'Picture', PictureSchema)