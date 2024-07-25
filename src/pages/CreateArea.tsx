import { useState } from "react"
import FormElement from "../components/FormElement"
import { useNavigate } from "react-router-dom"

const url: string = import.meta.env.VITE_API_URL



export default function CreateArea(){
    const [areaName, setAreaName] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch(`${url}/area`,{
            method: "post",
            credentials: "include",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({name: areaName})
        })
        if(res.status === 200){
            navigate("/areas")
        }
        else{
            console.log('error')
        }

    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAreaName(event.target.value)
    }

    return(
        <form onSubmit={handleSubmit}>
            <FormElement
                name='name'
                type="text"
                data={areaName}
                onChange={handleChange}
             />
            <button>
                Create
            </button>
        </form>
    )
}