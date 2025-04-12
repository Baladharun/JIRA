const { Router } = require("express");
const { newProject,getProjectDetails,createTicket} = require("../controller/projectController")
const projectRoutes = Router();

projectRoutes.post('/new-project',newProject);
projectRoutes.get('/getprojectDetails/:id',getProjectDetails)
projectRoutes.post('/createTicket',createTicket);
module.exports= projectRoutes