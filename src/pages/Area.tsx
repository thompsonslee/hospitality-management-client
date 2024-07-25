import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Loading from "./Loading"
import ProductInstanceDiv from "../components/ProductInstance"
import {area, ProductInstance} from "../Types"

const url: string = import.meta.env.VITE_API_URL
console.log(url)

export default function Area(){
    const [area,setArea] = useState <area>(null)
    const [products,setProducts] = useState <ProductInstance[]> ([])

    const areaId = useParams().areaId
    const navigate = useNavigate()

    useEffect(() => {
        const getData = async() => {
            const data = await fetch(`${url}/area/${areaId}`,
                {
                    credentials: "include",
                    headers: {
                        "content-type": "application/json;charset=UTF-8"
                    }
                }
            )
            if(data.status != 200){
                navigate("/login")
            }
            const {area, productInstances} = await data.json()
            setArea(area)
            setProducts(productInstances)
        }
        getData()
    },[areaId,navigate])

    return(
        <>
            {!area ? (
                <Loading />
            ) : (
                <>
                    <header>{area.name}</header>
                    <a href={`/area/${areaId}/orderItems`}>Order Items</a>
                    <a href={`/area/${areaId}/transferItems`}>Transfer Items</a>
                    <ul>
                        {products.map((product) => {
                            return(
                                <li key={product._id}>
                                    <ProductInstanceDiv productInstance={product} />
                                </li>
                            )
                        })}

                    </ul>
                </>
            )}
        </>
    )
}