import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./pages/authPage/authPage.jsx";
import CreateProject from "./pages/projectPage/createProject";
import AppLayout from "./pages/projectViewPage/AppLayout.jsx";
import Navbar from "./pages/Navbar/Navbar.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/project-view" element={<div> <Navbar /> <div><AppLayout /></div></div>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
