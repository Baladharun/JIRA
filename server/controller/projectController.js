const Project = require("../model/projectModel");
const User = require("../model/userModel");

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

        const collaboratorIds = [];
        const usersToUpdate = []; 

        for (const collaborator of collaborators || []) {
            const userDoc = await User.findOne({ userName: collaborator });
            if (userDoc) {
                collaboratorIds.push(userDoc._id);
                usersToUpdate.push(userDoc); 
            } else {
                return res.status(404).json({ message: `${collaborator} not found` });
            }
        }

        const newProject = new Project({
            projectName,
            admin,
            collaborators: collaboratorIds,
            stages: formattedStages,
            accessType,
        });

        await newProject.save();

        for (const user of usersToUpdate) {
            user.projectName = [...(user.projectName || []), projectName];
            user.hashedProject = [...(user.hashedProject || []), newProject._id];
            await user.save();
        }

        res.status(201).json({ message: "Project created successfully", project: newProject });
    } catch (error) {
        console.error("Error creating project:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



const getProjectDetails = async (req, res) => {
    try {
        const projectId = req.params.id;
        const user = req.body.user; 
        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        // if (project.accessType === "private" && !(project.collaborators.includes(user))) {
        //     return res.status(403).json({ message: "You don't have access to this project" });
        // }

        res.status(200).json(project);
    } catch (error) {
        console.error("Error fetching project details:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

const createTicket = async (req, res) => {
    try {
        const { id, stage, description, reporter, assignee, storyPoint, priority, title, type } = req.body;

        const projectDocument = await Project.findById(id);
        if (!projectDocument) {
            return res.status(404).json({ message: "Project with given id not found" });
        }

        const stageKeys = Object.keys(projectDocument.stages);
        const matchedStage = stageKeys.find(key => key.toLowerCase() === stage.toLowerCase());

        if (!matchedStage) {
            return res.status(400).json({ message: `Invalid stage provided. Available stages: ${stageKeys.join(', ')}` });
        }

        const newTicket = { description, reporter, assignee, storyPoint, priority, title, type };
        projectDocument.stages[matchedStage].push(newTicket);
        projectDocument.markModified('stages'); 
        await projectDocument.save();

        res.status(201).json({ message: "Ticket created successfully" });
    } catch (error) {
        console.error("Error creating ticket:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


module.exports = { newProject, getProjectDetails, createTicket };
