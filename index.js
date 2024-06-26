import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import multer from 'multer'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import Image from './src/models/image.js'
import projectRouter from './src/routers/project.js'
import userRouter from './src/routers/user.js'
import taskRouter from './src/routers/task.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

mongoose.connect('mongodb://localhost:27017/angular-asm').then(() => {
    console.log('Connected')
})

const app = express()
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb' }));
const port = 3000

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static(path.join(__dirname, './uploads')))
app.use('/project', projectRouter)
app.use('/user', userRouter)
app.use('/task', taskRouter)
app.post('/image', upload.single('image'), async (req, res) => {
    let existImage = await Image.findOne({ name: req.file.filename });
    if (existImage == null) {
        let data = await Image.create({
            name: req.file.filename,
            path: req.file.path,
            type: req.file.mimetype
        })
        res.status(200).json({ id: data._id })
    } else res.status(200).json({ id: existImage._id })
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})