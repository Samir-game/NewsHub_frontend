import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import CommentOp from "./pages/CommentOp.jsx";
import Sidebar from "./components/Sidebar.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import SignUp from "./pages/SignUp.jsx";
import FirstPage from "./pages/FirstPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <>
              <Sidebar/>
              <Home />
            </>
          }
        />
        <Route
          path="/news/:newsId"
          element={
            <>
              <Sidebar/>
              <CommentOp />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Sidebar/>
              <AboutUs />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
