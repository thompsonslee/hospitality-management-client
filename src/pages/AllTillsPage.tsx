import { useEffect,useState } from "react"
import { Link } from "react-router-dom"
const url: string = import.meta.env.VITE_API_URL

interface Till{
    _id: string
    name: string
    area: string
    gridArea: [{product: string, row:number, column:number}]
    size: number
}


export default function AllTillsPage(){
    const [tills,setTills] = useState<Till[]>([])


    useEffect(() => {
        const fetchAndSetTillLayouts = async() => {
            const tills = await fetch(`${url}/tillLayout`,{
                credentials: "include",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                },
            })
            setTills(await tills.json())
        }
        fetchAndSetTillLayouts()
    },[])
    return(
        <div>
            {
                tills.map((till) => {
                    return(
                        <div className="flex flex-col justify-center items-center">
                            <p>{till.name}</p>
                            <Link to={"/"}>Edit Till WIP</Link>
                            <Link to={`/area/${till.area}/tillLayouts/${till._id}`}>Display Till</Link>
                        </div>
                    )
                })
            }
        </div>
    )
}