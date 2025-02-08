const Project = require("../model/projectModel");

const newProject = async (req, res) => {
    try {
        const { projectName, admin, collaborators, stages, accessType } = req.body;
        if (!projectName || !admin || !accessType) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const formattedStages = {};
        if (Array.isArray(stages)) {
            stages.forEach(stage => {
                formattedStages[stage] = []; 
            });
        }
        const newProject = new Project({
            projectName,
            admin,
            collaborators: collaborators || [],
            stages: formattedStages,
            accessType,
        });

        await newProject.save();
        res.status(201).json({ message: "Project created successfully", project: newProject });
    } catch (error) {
        console.error("Error creating project:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = newProject;
