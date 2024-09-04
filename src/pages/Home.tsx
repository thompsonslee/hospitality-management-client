import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Loading from "./Loading"
const url: string = import.meta.env.VITE_API_URL

interface UserData{
    name: string,
    userAreaAmount: number,
    userTillAmount: number
    totalInstanceValue:{
        wholesale: number,
        retail: number
    }
}

export default function Home(){
    const navigate = useNavigate()
    const [userData, setUserData] = useState<UserData>()

    useEffect(() => {
        const getAndSetUserData = async() => {
            const data = await fetch(`${url}/userData`,{
                credentials: "include",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                }
            })
            setUserData(await data.json())
            if(data.status != 200){
                throw new Error("failed to fetch user data")
            }
        }
        getAndSetUserData()

    },[])

    return(
        <>
            {(userData) ? (
                <div className="text-white m-5">
                    <h1 className="text-3xl mb-5">Welcome {userData.name}</h1>
                    <p>This Account currently has {userData.userAreaAmount} Areas and {userData.userTillAmount} Tills associated with it</p>
                    <p>
                        The current inventory value of all the Areas combined
                        is ${userData.totalInstanceValue.wholesale} at wholesale
                        or ${userData.totalInstanceValue.retail} at retail price
                    </p>
                    <button 
                        className="rounded pl-5 pr-5 pt-3 pb-3 bg-red400 hover:bg-red600 mt-5"
                        onClick={() => navigate("/logout")}
                        >
                        Logout
                    </button>
                </div>
            ) : (
                <Loading />
            )}
        </>
    )
}