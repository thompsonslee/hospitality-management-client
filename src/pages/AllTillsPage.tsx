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
        <ul className="m-5 flex self-start gap-2">
            {
                tills.map((till) => {
                    return(
                        <li
                            key={till._id} 
                            className="flex flex-col p-5 gap-3 rounded items-center bg-zinc800 text-white">
                            <p>{till.name}</p>
                            <div className="flex flex-col gap-2">
                                <Link className="rounded p-5 bg-zinc600 hover:bg-green600" to={"/"}>Edit Till WIP</Link>
                                <Link className="rounded p-5 bg-zinc600 hover:bg-green600" to={`/area/${till.area}/tillLayouts/${till._id}`}>Display Till</Link>
                            </div>
                        </li>
                    )
                })
            }
            <li className="pt-5 text-white">
                <Link className="rounded p-5 bg-zinc800 hover:bg-green600" to={"/createTill"}>+</Link>
            </li>
        </ul>
    )
}