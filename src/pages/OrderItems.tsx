import CartItemInput from "../components/CartItemInput"
import { CartItemWithID, Product } from "../Types"
import { useEffect, useState } from "react"


export default function OrderItems(){

    const [products,setProducts] = useState<Product[]> ([])
    const [cartItems,setCartItems] = useState<CartItemWithID[]> ([])

    console.log(cartItems)

    const url: string = import.meta.env.VITE_API_URL

    const handleSubmit = () => {
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
        console.log(tempID)
        console.log(value)
    }
    const handleInputDelete = (tempID:number) => {
        console.log("deleting item")
        const index = cartItems.findIndex((cartItem) => { return cartItem.tempID === tempID})
        console.log(index)
        setCartItems(cartItems.filter((cartItem) => cartItem.tempID !== tempID))
    }

    const addItem = () => {
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
        <form onSubmit={handleSubmit}>
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
        </form>
            <button onClick={addItem} >+</button>
        </>
    )
}