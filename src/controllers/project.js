import Project from "../models/project.js"

export const getAll = async (req, res) => {
    let list = await Project.find().populate('image')
    res.status(200).json(list)
}

export const getOne = async (req, res) => {
    let project = await Project.findById(req.params.id).populate('image')
    res.status(200).json(project)
}

export const add = async (req, res) => {
    let projectExist = await Project.findOne({ name: req.body.name })
    if (!projectExist) {
        await Project.create(req.body);
        res.status(200).json({ message: 'ok' })
    } else res.status(400).json({ message: 'Project đã tồn tại!' })

}

export const edit = async (req, res) => {
    try {
        await Project.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({ message: 'ok' })
    } catch (error) {
        res.status(400).json(error)
    }
}

export const del = async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'ok' })
    } catch (error) {
        res.status(400).json(error)
    }
}