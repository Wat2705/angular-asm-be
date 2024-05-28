import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    teamSize: {
        type: Number,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
})

export default mongoose.model('project', ProjectSchema)