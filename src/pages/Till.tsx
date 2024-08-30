import { useEffect, useReducer } from "react"
import { TillLayout, HandleClick, Product, TillInstanceItem, ProductInstance, TillLayoutWithInstanceItems} from "../Types"
import { useParams } from "react-router-dom"
import TillGrid from "../components/TillGrid"
import ItemsToSell from "../components/ItemsToSell"
import { createUpdatedCartAndGridItems, convertTillItemsToTillInstanceItems } from "../utility/displayTillFunctions"

const url: string = import.meta.env.VITE_API_URL

interface CartItem{
    product: Product
    quantity: number
}

interface State{
    errors: {message: string} | null
    initialTill: TillLayoutWithInstanceItems | null
    till: TillLayoutWithInstanceItems | null 
    cart: CartItem[]
}

type ActionType =
    "SET_ERROR"
    |"SET_TILL"
    |"ADD_TO_CART"
    |"CANCEL_TRANSACTION"


interface Action{
    type: ActionType
    errormsg?: string
    till?: TillLayoutWithInstanceItems
    product?: Product
    newGridItems?: TillInstanceItem[]
    newCart?: CartItem[]
}

const initialArgs:State = {
    errors: null,
    initialTill: null,
    till: null,
    cart: []
}
const reducer = (state:State, action:Action):State => {
    switch(action.type){
        case("SET_ERROR"):
            if(!action.errormsg) return{...state,errors:{message: "undefined error"}}
            return{...state, errors:{message: action.errormsg}}
        case("SET_TILL"):
            if(!action.till) throw new Error("action.till is not defined")
            return{...state, till: action.till}
        case("ADD_TO_CART"):
            if(!action.newGridItems || !action.newCart) throw new Error("correct actions not given")
            if(!state.till) throw new Error("till not set")
            return{
                ...state,
                initialTill: state.initialTill ? state.initialTill : {...state.till, gridItems: state.till.gridItems.map((item) => {
                    if(!item.instance) return item
                    return{...item, instance: {...item.instance, product: Object.assign({}, item.instance.product)}}
                })},
                till:
                    {
                        ...state.till,
                        gridItems: action.newGridItems
                    },
                cart: action.newCart
            }
        case("CANCEL_TRANSACTION"):
            if(!state.initialTill || !state.cart.length)throw new Error("nothing in cart, or initialTill has not been set")
            return{...state, till: state.initialTill, cart: [], initialTill: null}
            
        default:
            throw new Error("no action provided")
    }   
}
const fetchTillWithInstanceItems = async(areaId: string, tillLayoutId: string) => {

    const [tillFetch,productInstancesFetch] = await Promise.all(
        [
            await fetch(`${url}/area/${areaId}/tillLayout/${tillLayoutId}`,{
                credentials: "include",
                headers: {
                    "content-type": "application/json;charset=UTF-8"
                }
            })
            , //`${url}/area/${areaId}/productInstances`
            await fetch(`${url}/area/${areaId}/productInstances`,{
                credentials: "include",
                headers: {
                        "content-type": "application/json;charset=UTF-8"
                }
            })
        ]
    )
    const till: TillLayout = await tillFetch.json()
    const productInstances:ProductInstance[] = await productInstancesFetch.json()
    console.log(productInstances)

    return  {...till, gridItems: convertTillItemsToTillInstanceItems(productInstances, till.gridItems)}

}


export default function Till(){
    const {areaId, tillLayoutId} = useParams()
    const [state,dispatch] = useReducer(reducer, initialArgs)

    const handleClick: HandleClick = (_mouseEvent, _tillGridIndex, tillItem) => {
        if(!tillItem || !state.till) return
        if("instance" in tillItem && tillItem.instance){
            if(tillItem.instance.quantity === 0) return
            console.log(state.till.gridItems)
            const {newGridItems,newCart} = createUpdatedCartAndGridItems(tillItem.instance._id, state.till.gridItems, state.cart)
            console.log(newGridItems)
            dispatch({type: "ADD_TO_CART", newGridItems: newGridItems, newCart: newCart})
        }else throw new Error("No instance in tillItem")
    }

    const handleCancelTransaction = () => {
        if(!state.cart.length || !state.initialTill){
            return;
        }
        dispatch({type:"CANCEL_TRANSACTION"})
    }


    const handleSubmit = async() => {
        const req = await fetch(`${url}/area/${areaId}/sellItems`,{
            method: "post",
            credentials: "include",
            headers: {
                "content-type": "application/json;charset=UTF-8"
            },
            body: JSON.stringify({
                products: state.cart.map((cartItem) => {
                    return {
                        id: cartItem.product._id,
                        quantity: cartItem.quantity
                    }})
            })
        })
        if(req.status === 200){
            alert("transaction successful");
            if(!areaId) throw new Error("not areaId");
            if(!tillLayoutId) throw new Error("no tillLayoutId");
            dispatch({type:"CANCEL_TRANSACTION"});
            dispatch({type:"SET_TILL", till: await fetchTillWithInstanceItems(areaId, tillLayoutId)});
        }
    }

    useEffect(() => {
        const fetchAndSetItems = async() => {
            if(!areaId || !tillLayoutId) return;
            const till = await fetchTillWithInstanceItems(areaId, tillLayoutId)
            dispatch({type:"SET_TILL", till: till})
        }
        fetchAndSetItems()
    },[areaId, tillLayoutId])
    return(
        <>
            {state.errors && (<div>Error</div>)}
            {(!state.till) ? (
                <div>loading</div>
            ) : (
                <div className="absolute w-full h-full flex justify-center bg-background items-stretch">
                    <TillGrid
                        tillArray={state.till.gridItems}
                        size={state.till.size}
                        handleClick={handleClick}
                    />
                    <ItemsToSell
                        cart={state.cart}
                        onCancel={handleCancelTransaction}
                        onSubmit={handleSubmit}
                    />
                 </div>
            )}
        </>
    )
}