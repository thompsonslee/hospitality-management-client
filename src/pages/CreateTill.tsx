import TillGrid from "../components/TillGrid"
import { TillItem,area,Product } from "../Types"
import { useEffect, useReducer } from "react"

interface InitState{
    name: string
    till: TillItem[]
    displayTill: boolean
    size: number
    areas: area[]
    selectedAreaId?: string 
    products?: Product[]
}

type ActionTypes = 
    'CHANGE_TILL_NAME' |
    'GRID_SIZE_CHANGE' |
    'DISPLAY_TILL' |
    'SET_AREAS' |
    'SET_AREA_ID' |
    'SET_PRODUCTS' |
    'SET_GRID_DIV_PRODUCT'

interface Action{
    type: ActionTypes
    name?: string
    size?: number
    areas?: area[]
    areaId?: string
    products?: Product[]
    tillItem?: TillItem
}

const reducer = (state: InitState, action: Action):InitState => {
    switch(action.type){
        case("CHANGE_TILL_NAME"):
            if(!action.name) throw new Error("no name given")
            return{...state, name: action.name}
        case("GRID_SIZE_CHANGE"):
            if(!action.size) return {...state, size: 5}
            return {...state, size:action.size}
        case("DISPLAY_TILL"):
            return{...state, displayTill: true}
        case("SET_AREAS"):
            if(!action.areas) throw new Error("no areas in action");
            return{...state, areas: action.areas}
        case("SET_AREA_ID"):
            if(!action.areaId) throw new Error("no area ID given");
            return{...state, selectedAreaId: action.areaId}
        case("SET_PRODUCTS"):
            return{...state, products: action.products}
        case("SET_GRID_DIV_PRODUCT"):
            if(!action.tillItem) throw new Error("no tillItem given")
            return{...state, till: modifyTillDiv(state.till, action.tillItem )}
        default: throw new Error(`invalid action type, action type: ${action.type}`)
    }
}

const modifyTillDiv = (till: TillItem[], tillItem: TillItem):TillItem[] => {

    const updatedTill = till
    for(let i=0; i<updatedTill.length; i++){
        if(updatedTill[i].row === tillItem.row && updatedTill[i].row === tillItem.column){
            updatedTill[i].product = tillItem.product
            return updatedTill
        }
    }
    updatedTill.push(tillItem)
    return updatedTill
}

export default function Till(){

    const url: string = import.meta.env.VITE_API_URL

    const initialArgs: InitState = {
        name: "",
        till: [],
        size: 5,
        displayTill: false,
        areas: [],
        selectedAreaId: undefined,
        products: undefined
    }

    const [state, dispatch] = useReducer(reducer,initialArgs)

    const modifyTillDiv = (tillItem: TillItem) => {
        dispatch({type:"SET_GRID_DIV_PRODUCT", tillItem: tillItem})
    }

    const convertTillItemsToIds = (till: TillItem[]) => {
        return till.map((tillItem) => { return({...tillItem, product: tillItem.product._id})} )
    }

    const handleTillSubmit = async() => {

        const data = await fetch(`${url}/area/${state.selectedAreaId}/tillLayout`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                name: state.name,
                gridItems: convertTillItemsToIds(state.till),
                size: state.size
            })
        })
        console.log(data.statusText)
    }


    useEffect(() =>{
        const fetchAndSetAreas = async() => {
            const data = await fetch(`${url}/area`,{
                credentials: "include",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                },
            })
            dispatch({type:"SET_AREAS", areas: await data.json()})
        }
        fetchAndSetAreas()

    },[url])
    useEffect(() => {
        const fetchAndSetProducts = async() => {
            const data = await fetch(`${url}/product`, {
                credentials: "include",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                },
            })
            dispatch({type: "SET_PRODUCTS", products: await data.json()})
    
        }
        fetchAndSetProducts()
    },[url])

    return(
        <div className="flex flex-grow justify-center items-center">
            {(state.displayTill) ? (
                <>
                    <TillGrid 
                        tillArray={state.till}
                        size={state.size}
                        products={state.products}
                        modifyTillDiv={modifyTillDiv}
                    />
                    <button onClick={() => handleTillSubmit()}>submit</button>
                </>
            ) : (
                <>
                    <form className="flex flex-col justify-center" onSubmit={(e) => {
                        e.preventDefault()
                        dispatch({type: "DISPLAY_TILL"})}}>
                        <div className="flex flex-col">
                            <label>Till Name</label>
                            <input
                                required={true}
                                type="text"
                                onChange={(e) => dispatch({type: "CHANGE_TILL_NAME", name: e.target.value})}
                            ></input>
                        </div>
                        <div className="flex flex-col">
                            <label>Select area for till</label>
                            <select 
                                required={true} 
                                defaultValue={""}
                                onChange={(e) => dispatch({type: "SET_AREA_ID", areaId: e.target.value})}
                            >
                                <option disabled={true} value="">Choose Area</option>
                                {state.areas.map((area) => {
                                    return(
                                        <option key={area?._id} value={area?._id}>
                                            {area?.name}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label>Choose amout of rows</label>
                            <input 
                                required={true}
                                max={10}
                                min={5}
                                defaultValue={5}
                                type="number" 

                                onChange={(e) => dispatch({type: "GRID_SIZE_CHANGE", size: parseInt(e.target.value)})}>
                            </input>
                        </div>
                        <button>continue</button>
                    </form>
                </>
            )}

        </div>
    )
}