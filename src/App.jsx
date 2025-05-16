import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import Home from "./pages/Home"
import {createBrowserRouter,RouterProvider} from 'react-router-dom'


const router = createBrowserRouter([
  { path: "/signup", element: <SignUp/> },
  { path: "/login", element: <Login/> },
  { path: "/home", element: <Home/> },             
]);


function App() {
  return (
   <div>
     <RouterProvider router={router} /> 
   </div>
  )
}

export default App

