import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Loading from "./Loading"
import ProductInstance from "../components/ProductInstance"

type area = {
    _id: string,
    name: string,
    user: string
} | null

type productInstance = {
    _id: string,
    area: string,
    product: {
        name: string,
        price: {
            retail: number,
            wholesale: number
        }
    },
    quantity: number
}

export default function Area(){
    const [area,setArea] = useState <area>(null)
    const [products,setProducts] = useState <productInstance[]> ([])

    const areaId = useParams().areaId

    useEffect(() => {
        const getData = async() => {
            const data = await fetch(`http://localhost:3000/area/${areaId}`,
                {
                    credentials: "include",
                    headers: {
                        "content-type": "application/json;charset=UTF-8"
                    }
                }
            )
            const {area, productInstances} = await data.json()
            setArea(area)
            setProducts(productInstances)
        }
        getData()
    },[areaId])

    return(
        <>
            {!area ? (
                <Loading />
            ) : (
                <>
                    <header>{area.name}</header>
                    <ul>
                        {products.map((product) => {
                            return(
                                <li key={product._id}>
                                    <ProductInstance productInstance={product} />
                                </li>
                            )
                        })}

                    </ul>
                </>
            )}
        </>
    )
}