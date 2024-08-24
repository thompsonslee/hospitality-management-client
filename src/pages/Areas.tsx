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

                    <ul className="m-5 flex gap-2">
                        {areas.map((area) => {
                            return(
                                <li className="pt-5" key={area._id}>
                                    <a className="p-5 text-lg rounded bg-zinc800 text-white hover:bg-green600" href={`/area/${area._id}`}>{area.name}</a>
                                </li>
                            )
                        })}
                        <li className="pt-5">
                            <a className="p-5 text-lg rounded bg-zinc700 text-white hover:bg-green600" href="/areas/create">+</a>
                        </li>
                    </ul>    
                </>
            )}
        </>
    )
}