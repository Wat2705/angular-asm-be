import express from "express";
import { getAllDev, logIn, register } from "../controllers/user.js";

const router = express.Router()

router.post('/register', register)
router.post('/login', logIn)
router.get('/getdev', getAllDev)

export default router