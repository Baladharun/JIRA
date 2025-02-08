import { BrowserRouter,Route,Routes} from "react-router-dom"
import Auth  from "./pages/authPage/authPage.jsx"
import createProject from "./pages/projectPage/createProject"
function App() {
  return (
   <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={Auth()}></Route>
        <Route path="/create-project" element={createProject()}></Route>
      </Routes>
    </BrowserRouter>
   </>
  )
}

export default App
