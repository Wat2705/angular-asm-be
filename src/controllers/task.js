import Task from "../models/task.js"

export const getAll = async (req, res) => {
    let list = await Task.find().populate('project').populate('assign')
    res.status(200).json(list)
}

export const getOne = async (req, res) => {
    let task = await Task.findById(req.params.id).populate('project').populate('assign')
    res.status(200).json(task)
}

export const add = async (req, res) => {
    let taskExist = await Task.findOne({ name: req.body.taskName })
    if (!taskExist) {
        await Task.create({
            name: req.body.taskName,
            description: req.body.desc,
            project: req.body.projectID,
            assign: req.body.assign,
            priority: req.body.priority,
            status: 'Holding'
        });
        res.status(200).json({ message: 'ok' })
    } else res.status(400).json({ message: 'Task đã tồn tại!' })
}

export const edit = async (req, res) => {
    try {
        await Task.findByIdAndUpdate(req.params.id, {
            name: req.body.taskName,
            description: req.body.desc,
            project: req.body.projectID,
            assign: req.body.assign,
            priority: req.body.priority,
            status: req.body.status
        });
        res.status(200).json({ message: 'ok' })
    } catch (error) {
        res.status(400).json(error)
    }
}

export const del = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'ok' })
    } catch (error) {
        res.status(400).json(error)
    }
}