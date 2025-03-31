const mongoose = require("mongoose");

const stageSchema = new mongoose.Schema({
    taskName: { type: String, required: true },
    assignedTo: { type: String, required: false },
    status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" },
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
    dueDate: { type: Date, required: false }
}, { _id: false }); 

const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true
    },
    admin: {
        type: String,
        required: true
    },
    collaborators: {
        type: [String], 
        default: []
    },
    stages: {
        type: Map,
        of: [Object], 
        default: {}   
    },
    accessType: {
        type: String,
        enum: ["public", "private"],
        required: true
    }
});

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;

