import { useParams } from "react-router-dom"
import CartItemInput from "../components/CartItemInput"
import { CartItemWithID, Product } from "../Types"
import { useEffect, useState } from "react"


export default function OrderItems(){

    const [products,setProducts] = useState<Product[]> ([])
    const [cartItems,setCartItems] = useState<CartItemWithID[]> ([])

    console.log(cartItems)
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
            console.log(res.status)
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
        console.log(tempID)
        console.log(value)
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
        <form>
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
            <button onClick={addItem} >+</button>
            <button onClick={handleSubmit}>Submit</button>

        </form>

        </>
    )
}