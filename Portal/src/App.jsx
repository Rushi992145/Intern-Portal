import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./page/LandingPage";
import HomePage from "./page/HomePage";
import InternshipPage from "./page/InternshipPage";
import FullTimeJobsPage from "./page/FullTimeJobsPage";
import AppliedPage from "./page/AppliedPage";
<<<<<<< HEAD
import PostTemplate from "./components/PostTemplate";
import ProfilePage from "./page/ProfilePage";
=======
import AppliedComponent from "./components/AppliedComponent";
>>>>>>> f5434158577d84809cca341d487436cfd8bb5ab7

function App() {

  return (
    <div className="App">
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/home" element={<HomePage/>}/>
          <Route path="/test" element={<AppliedComponent/>}/>
          <Route path="/internships" element={<InternshipPage/>}/>
          <Route path="/fulltime-jobs" element={<FullTimeJobsPage/>}/>
          <Route path="/applied" element={<AppliedPage/>}/>
          <Route path="/profile" element={ <ProfilePage/> }/>
          
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
