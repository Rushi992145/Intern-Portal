import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./page/LandingPage";
import HomePage from "./page/HomePage";
import InternshipPage from "./page/InternshipPage";
import FullTimeJobsPage from "./page/FullTimeJobsPage";
import AppliedPage from "./page/AppliedPage";
// import PostTemplate from "./components/PostTemplate";
import ProfilePage from "./page/ProfilePage";
import AppliedComponent from "./components/AppliedComponent";
import { Provider } from 'react-redux';
import store from './redux/store';
import SignInPage from "./page/SignInPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {

  return (
    <Provider store={store}>
        <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/signin" element={<SignInPage/>} />
          <Route path="/home" element={<HomePage/>}/>
          <Route path="/test" element={<AppliedComponent/>}/>
          <Route path="/internships" element={<InternshipPage/>}/>
          <Route path="/fulltime-jobs" element={<FullTimeJobsPage/>}/>
          <Route path="/applied" element={<AppliedPage/>}/>
          <Route path="/profile" element={ <ProfilePage/> }/>
          
        </Routes>
        <Footer/>
      </BrowserRouter>
    </Provider>
  )
}

export default App
