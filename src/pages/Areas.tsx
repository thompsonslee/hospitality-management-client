import { useState,useEffect } from "react"
import Loading from "./Loading"

type area = {
    _id: string,
    name: string,
    user: string
}
type status = "loading" | "fulfilled"


export default function Areas(){

    const [areas,setAreas] = useState <area[]> ([])
    const [status,setStatus] = useState<status>("loading")

    useEffect(() => {
    const getAreas = async () => {
        const data = await fetch("http://localhost:3000/area",{
            method: "get",
            headers: {
                "content-type": "application/json;charset=UTF-8"
            },
            credentials: "include"
        })
        setStatus("fulfilled")
        
        if(data.status === 403){
            console.log("forbidden")
            return
        }
        const areas = await data.json()
        setAreas(areas)
        }
        getAreas()
    },[])
    return(
        <>
            {(status === "loading") ? (
                <Loading />
            ) : (
                <>

                    <ul>
                        {areas.map((area) => {
                            return(
                                <li className="p-5 text-lg bg-zinc800 text-white flex justify-center items-center m-2" key={area._id}>
                                    <a href={`/area/${area._id}`}>{area.name}</a>
                                </li>
                            )
                        })}
                        <li className="p-5 text-lg bg-zinc800 text-white m-2">
                            <a href="/areas/create">Create Area</a>
                        </li>
                    </ul>    
                </>
            )}
        </>
    )
}