import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import projectRouter from './src/routers/project.js'

mongoose.connect('mongodb://localhost:27017/angular-asm').then(() => {
    console.log('Connected')
})

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())
app.use('/project', projectRouter)

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})