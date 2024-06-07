import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project',
    },
    assign: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    priority: {
        type: String
    },
    status: {
        type: String
    }
})

export default mongoose.model('task', TaskSchema)