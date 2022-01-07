import { model, Schema } from 'mongoose'

const CategorySchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
})

export default model( 'Category', CategorySchema)