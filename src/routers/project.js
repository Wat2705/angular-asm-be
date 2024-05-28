import express from "express";
import { add, del, edit, getAll, getOne } from "../controllers/project.js";

const router = express.Router()

router.get('/', getAll)
router.get('/:id', getOne)
router.post('/', add)
router.put('/:id', edit)
router.delete('/:id', del)

export default router