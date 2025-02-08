const { Router } = require("express");
const newProject = require("../controller/projectController")
const projectRoutes = Router();

projectRoutes.post('/new-project',newProject);

module.exports= projectRoutes