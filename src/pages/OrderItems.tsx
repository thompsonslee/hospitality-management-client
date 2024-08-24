import { useParams } from "react-router-dom"
import CartItemInput from "../components/CartItemInput"
import { CartItemWithID, Product } from "../Types"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export default function OrderItems(){

    const navigate = useNavigate()

    const [products,setProducts] = useState<Product[]> ([])
    const [cartItems,setCartItems] = useState<CartItemWithID[]> ([])

    const areaID = useParams().areaId
    const url: string = import.meta.env.VITE_API_URL

    const handleSubmit = (e:React.MouseEvent) => {
        e.preventDefault()
        const products = cartItems.map((cartItem) => {
            return({
                id: cartItem.id,
                quantity: cartItem.quantity
            })
        })
        fetch(`${url}/area/${areaID}/orderItems`,{
            method: "post",
            credentials: "include",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({products: products})
        }).then((res) => {
            if(res.status === 200) navigate(`/area/${areaID}`)
        }).catch(() => {
            console.log("error with post request")
        })
        console.log(cartItems)
    }

    const handleInputChange = (value: string|number,tempID:number) => {

        setCartItems(cartItems.map((cartItem) => {
            if(cartItem.tempID === tempID){
                if(typeof value === "string"){
                    return({...cartItem, id: value})
                }
                return({...cartItem, quantity: value})
                
            }
            return cartItem
        }))
    }
    const handleInputDelete = (tempID:number) => {
        console.log("deleting item")
        const index = cartItems.findIndex((cartItem) => { return cartItem.tempID === tempID})
        console.log(index)
        setCartItems(cartItems.filter((cartItem) => cartItem.tempID !== tempID))
    }

    const addItem = (e: React.MouseEvent) => {
        e.preventDefault()
        setCartItems([...cartItems, {id: "", quantity: 1, tempID: Math.random()}])
        console.log(cartItems)
    }

    useEffect(() => {
        const getData = async() => {
            const data = await fetch(`${url}/product`,{
                credentials: "include",
                method: "get",
                headers: {
                    "content-type": "application/json;charset=UTF-8"
                },
            })

            const products = await data.json()
            setProducts(products)
        }
        getData()
    },[url])

    return(
        <>
            <form className="m-5 flex flex-col gap-2">
                <div className="flex gap-2">
                    {cartItems.map((cartItem) => {
                        return(
                            <CartItemInput 
                                key={cartItem.tempID}
                                cartItem={cartItem}
                                products={products}
                                handleInputChange={handleInputChange}
                                deleteInput={handleInputDelete}
                            />)
                    })}
                    <button className="bg-zinc800 w-72 h-80 text-white flex justify-center items-center hover:bg-green600 rounded text-8xl"
                     onClick={addItem}
                    >+</button>
                </div>
                <div>
                    <button className="p-5 rounded text-white bg-zinc800 hover:bg-green600" onClick={handleSubmit}>Submit</button>
                </div>

            </form>
        </>
    )
}