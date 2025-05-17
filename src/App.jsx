import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import Home from "./pages/Home"
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import CommentOp from "./pages/CommentOp";
import Navbar from "./components/Navbar";
import AboutUs from "./pages/AboutUs";

const router = createBrowserRouter([
  { 
    path: "/signup", 
    element: <SignUp/>
  },

  { 
    path: "/login", 
    element: <Login/>
  },

  { 
    path: "/home", 
    element: 
    <div>
      <Navbar/>
      <Home/>
    </div>
  },

  { path: "/news/:newsId", 
    element:
    <div>
      <Navbar/>
      <CommentOp/> 
    </div>
  },
  
  {
    path:"/about",
    element: <AboutUs/>
  }

]);


function App() {
  return (
   <div>
     <RouterProvider router={router} /> 
   </div>
  )
}

export default App

