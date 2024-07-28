import { createBrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import App from "./App"
import ErrorPage from "./pages/Error"
import LoginPage from "./pages/LoginPage"
import Areas from "./pages/Areas"
import Area from "./pages/Area"
import OrderItems from "./pages/OrderItems"
import TransferItems from "./pages/TransferItems"
import CreateArea from "./pages/CreateArea"
import Transactions from "./pages/Transactions"



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
        path: "/areas/create",
        element: <CreateArea />
      },
      {
        path: "/area/:areaId",
        element: <Area />
      },
      {
        path: "/area/:areaId/orderItems",
        element: <OrderItems />
      },
      {
      path: "/area/:areaId/transferItems",
      element: <TransferItems />
      },
      {
        path: "/transactions",
        element: <Transactions />
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
