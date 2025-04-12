import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Auth from "./pages/authPage/authPage.jsx";
import CreateProject from "./pages/projectPage/createProject";
import AppLayout from "./pages/projectViewPage/AppLayout.jsx";
import Navbar from "./pages/Navbar/Navbar.jsx";
import AppSidebar from "./pages/projectViewPage/ProjectView.jsx";
import HomePage from "./pages/your-work/HomePage.jsx";
import ProjectStructure from "./pages/projectViewPage/projectStructure.jsx";

const ProjectStructureWrapper = () => {
  const { projectId } = useParams();
  return (
    <div style={{ height: "100%" }}>
      <Navbar />
      <div style={{ height: "100%" }}>
        <AppLayout>
          <AppSidebar />
          <ProjectStructure projectKey={projectId} />
        </AppLayout>
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/your-work" element={
          <div> 
            <Navbar /> 
            <div>
              <AppLayout>
                <AppSidebar />
                <HomePage />
              </AppLayout>
            </div>
          </div>
        } />
        <Route path="/project-view/:projectId" element={<ProjectStructureWrapper />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
