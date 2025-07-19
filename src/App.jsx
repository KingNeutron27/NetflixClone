import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import VideoPlayer from "./pages/VideoPlayer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase";



function App() {
  const navigate = useNavigate()
  useEffect(() => {
    onAuthStateChanged(auth, async(user) => {
      if(user) {
        console.log('logged in')
        navigate('/')
      } else{
        console.log('logged out')
        navigate('/login')
      }
    })
  }, [])

  return (
    <>
      <ToastContainer theme="dark"/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/video/:id" element={<VideoPlayer />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  );
}

export default App;