import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Loading from "./Loading"
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
                <div className=" flex flex-col m-5">
                    <header className="text-white text-2xl mb-2">{area.name}</header>
                    <div className="flex gap-2">
                        <a className="p-5 rounded text-white bg-zinc800 hover:bg-green600" href={`/area/${areaId}/orderItems`}>Order Items</a>
                        <a className="p-5 rounded text-white bg-zinc800 hover:bg-green600" href={`/area/${areaId}/transferItems`}>Transfer Items</a>
                    </div>
                    <div className="bg-zinc800 rounded p-5 mt-2 text-white">
                        <h2 className="text-xl">Inventory</h2>
                        <ul className="flex gap-2 mt-3">
                            {products.map((product) => {
                                return(
                                    <li className="p-5 rounded bg-zinc600" key={product._id}>
                                        <strong>{product.product.name}</strong>
                                        <p>Quantity: {product.quantity}</p>
                                    </li>
                                )
                            })}

                        </ul>
                    </div>
                </div>
            )}
        </>
    )
}