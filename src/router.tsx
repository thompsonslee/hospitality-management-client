import { createBrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import App from "./App"
import ErrorPage from "./pages/Error"
import LoginPage from "./pages/LoginPage"
import Areas from "./pages/Areas"
import Area from "./pages/Area"



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children:[
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/areas",
        element: <Areas />
      },
      {
        path: "/area/:areaId",
        element: <Area />
      }
    ]

    
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
