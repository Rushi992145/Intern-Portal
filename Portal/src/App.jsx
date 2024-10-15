import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./page/LandingPage";
import HomePage from "./page/HomePage";
import InternshipPage from "./page/InternshipPage";
import FullTimeJobsPage from "./page/FullTimeJobsPage";
import AppliedPage from "./page/AppliedPage";
import AppliedComponent from "./components/AppliedComponent";

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
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
