import { useEffect,useState } from "react"
import { Link } from "react-router-dom"
import DeleteTill from "../components/DeleteTill"
const url: string = import.meta.env.VITE_API_URL

interface Till{
    _id: string
    name: string
    area: string
    gridArea: [{product: string, row:number, column:number}]
    size: number
}


export default function AllTillsPage(){
    const [tillDeleteId, setTillDeleteId] = useState<string | null>(null)
    const [tills,setTills] = useState<Till[]>([])

    const handleDelete = async() => {
        const areaId = tills.find(till => till._id === tillDeleteId)?.area
        if(!areaId) throw new Error("no areaId")
        const data = await fetch(`${url}/area/${areaId}/tillLayout/${tillDeleteId}`,{
            method: "delete",
            credentials: "include",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
        })
        if(data.status === 200){
            setTills(tills.filter(till => till._id != tillDeleteId))
            setTillDeleteId(null)
        }
    }
    const handleCancel= () => setTillDeleteId(null)

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
        tillDeleteId? (
            <DeleteTill
                tillName={tills.find(till => till._id === tillDeleteId)?.name}
                onCancel={handleCancel}
                onConfirm={handleDelete}
             />)
        :
        <ul className="m-5 flex self-start gap-2">
            {
                tills.map((till) => {
                    return(
                        <li
                            key={till._id} 
                            className="flex flex-col p-5 gap-3 rounded items-center bg-zinc800 text-white">
                            <p>{till.name}</p>
                            <div className="flex flex-col gap-2">
                                <Link className="rounded p-5 bg-zinc600 hover:bg-green600" to={`/area/${till.area}/tillLayouts/${till._id}/edit`}>Edit</Link>
                                <Link className="rounded p-5 bg-zinc600 hover:bg-green600" to={`/area/${till.area}/tillLayouts/${till._id}`}>Display</Link>
                                <button className="rounded p-5 bg-zinc600 hover:bg-red600" onClick={() => setTillDeleteId(till._id)}>Delete</button>
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