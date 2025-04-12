const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    description: String,
    reporter: String,
    assignee: String,
    storyPoint: Number,
    priority: String,
    title: String,
    type: String
  }, { _id: false });
  
  const projectSchema = new mongoose.Schema({
    projectName: String,
    admin: String,
    collaborators: [String],
    accessType: String,
    stages: {
        type: Object,
        default: {}
    }
  });
  

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;

