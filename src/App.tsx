import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate, Outlet, redirect} from "react-router-dom"
import Nav from "./components/Nav"
import Home from "./pages/Home"
import Area from "./pages/Area"
import Areas from "./pages/Areas"
import CreateArea from "./pages/CreateArea"
import OrderItems from "./pages/OrderItems"
import TransferItems from "./pages/TransferItems"
import Transactions from "./pages/Transactions"
import LoginPage from "./pages/LoginPage"
import Loading from "./pages/Loading"
import AllTillsPage from "./pages/AllTillsPage"
import { useState } from "react"
import CreateTill from "./pages/CreateTill"
import AreaTills from "./pages/AreaTills"
import Till from "./pages/Till"
import ErrorPage from "./pages/Error"

const url: string = import.meta.env.VITE_API_URL


const checkSession = async() => {
    const req = await fetch(`${url}/sessionActive`,{
        credentials: "include",
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
    })
    return(req.status === 200)
}

const logout = async() => {
    const req = await fetch(`${url}/logout`,{
        method: "post",
        credentials: "include",
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
    })
    if(req.status === 200)
    return redirect("/login")
}


const ProtectedRoutes = () => {
    const [authStatus,setAuthStatus] = useState('loading')
    console.log("checking session")
    
    checkSession().then((response) => {
        if(!response){
            setAuthStatus('unauthorized')
        }
        else(setAuthStatus('authorized'))
    })

    if(authStatus === 'loading') return(<Loading />)
    if(authStatus === 'unauthorized')return (<Navigate to={"/login"} />)
    if(authStatus === 'authorized')return(
        <div className="flex">
            <Nav />
            <Outlet />
        </div>
    )
}

export default function App(){
    return(
        <RouterProvider router = {createBrowserRouter(createRoutesFromElements(
            <>
                <Route path="/" element={<ProtectedRoutes />} errorElement={<ErrorPage />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/areas/" element={<Areas /> } />
                    <Route path="/tillLayouts" element={<AllTillsPage />} />
                    <Route path="/createTill" element={<CreateTill />} />
                    <Route path="/areas/create" element={<CreateArea />} />
                    <Route path="/area/:areaId" element={<Area />}/>
                    <Route path="/area/:areaId/orderItems" element={<OrderItems />} />
                    <Route path="/area/:areaId/transferItems" element={<TransferItems />} />
                    <Route path="/area/:areaId/tillLayouts/" element={<AreaTills />}/>
                    <Route path="/area/:areaId/tillLayouts/:tillLayoutId" element={<Till />} />
                    <Route path="/area/:areaId/tillLayouts/:tillLayoutId/edit" element={<CreateTill />} />
                    <Route path="/transactions" element={<Transactions />} />
                    <Route path="/logout" loader={logout} />
                </Route>
                <Route path="/login" element={<LoginPage type="login" />} />
                <Route path="/register" element={<LoginPage type="register" />} />
            </>
        ))} 
        />
    )
}

