import { useState} from 'react' 
import './App.css'
import {useIt} from './context.jsx';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import Upload from "./components/Upload.jsx"; 
import SignIn from './components/SignIn.jsx';
import Navbar from "./components/Navbar.jsx"; 
import EditProfile from "./components/EditProfile.jsx";  
import Home from "./pages/Home.jsx";
import Search from "./pages/Search.jsx";
import Video from "./pages/Video.jsx"; 


function App() { 
  const {openUpload, showSignIn} = useIt();

  return (
    <BrowserRouter>
      <div className="Container">
        <Sidebar />
        <div className="main" >
            <Navbar />
            <div className="wrapper" > 
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random"/>} />
                  <Route path="trends" element={<Home type="trend"/>}/>
                  <Route path="subscriptions" element={<Home type="sub"/>}/>
                  <Route path="search" element={<Search/>}/>
                  <Route path="edit-profile" element={<EditProfile/>}/> 
                  <Route path="video">
                    <Route path=":id" element={<Video/>}/>
                  </Route>
                </Route>
              </Routes>
            </div>
        </div> 
        {openUpload && <Upload />}
        {showSignIn && <SignIn/>} 
      </div>   
    </BrowserRouter>
  )
}

export default App
