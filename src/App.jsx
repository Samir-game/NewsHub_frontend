import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import CommentOp from "./pages/CommentOp.jsx";
import Navbar from "./components/Navbar.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import SignUp from "./pages/SignUp.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <>
            
              <Home />
            </>
          }
        />
        <Route
          path="/news/:newsId"
          element={
            <>
            
              <CommentOp />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
   
              <AboutUs />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
