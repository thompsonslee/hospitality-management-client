import { useState,useEffect } from "react"

type area = {
    _id: string,
    name: string,
    user: string
}


export default function Areas(){

    const [areas,setAreas] = useState <area[]> ([])

    useEffect(() => {
    const getAreas = async () => {
        const data = await fetch("http://localhost:3000/area",{
                method: "get",
                headers: {
                    "content-type": "application/json;charset=UTF-8"
                },
                credentials: "include"
            })
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
            <ul>
                {areas.map((area) => {
                    return(
                        <li key={area._id}>
                            <a href={`/area/${area._id}`}>{area.name}</a>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}