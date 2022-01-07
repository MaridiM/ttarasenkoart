import mongoose from 'mongoose'
import { MONGODB_URI } from './config'

// Connect to gb
mongoose.connect(MONGODB_URI)

const connectionDB = mongoose.connection

connectionDB.once('open', () => console.log('✔️ Connected to DB'))
connectionDB.on('error', () => console.log('❌ Failed to connect to DB'))