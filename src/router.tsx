import { createBrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import ErrorPage from "./pages/Error"
import LoginPage from "./pages/LoginPage"



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />
  },
  {
    path: "/register",
    element:<LoginPage type="register" />
  },
  {
    path: "/login",
    element: <LoginPage type="login"/>
  }
])


export default router
