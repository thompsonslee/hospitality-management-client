import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate, Outlet} from "react-router-dom"
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
import { useState } from "react"
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
    if(authStatus === 'authorized')return(<><Nav /><Outlet /></>)
}

export default function App(){
    return(
        <RouterProvider router = {createBrowserRouter(createRoutesFromElements(
            <>
                <Route path="/" element={<ProtectedRoutes />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/areas/" element={<Areas /> } />
                    <Route path="/areas/create" element={<CreateArea />} />
                    <Route path="/area/:areaId" element={<Area />}/>
                    <Route path="/area/:areaId/orderItems" element={<OrderItems />} />
                    <Route path="/area/:areaId/transferItems" element={<TransferItems />} />
                    <Route path="/transactions" element={<Transactions />} />
                </Route>
                <Route path="/login" element={<LoginPage type="login" />} />
                <Route path="/register" element={<LoginPage type="register" />} />
            </>
        ))} 
        />
    )
}

