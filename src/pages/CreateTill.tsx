import TillGrid from "../components/TillGrid"
import { TillItem,area,Product,TillDivInfo } from "../Types"
import { useEffect, useReducer } from "react"

interface InitState{
    till: TillItem[][]
    displayTill: boolean
    areas: area[]
    selectedAreaId?: string 
    products?: Product[]
}

type ActionTypes = 
    'GRID_SIZE_CHANGE' |
    'DISPLAY_TILL' |
    'SET_AREAS' |
    'SET_AREA_ID' |
    'SET_PRODUCTS' |
    'SET_GRID_DIV_PRODUCT'

interface Action{
    type: ActionTypes
    size?: number
    areas?: area[]
    areaId?: string
    products?: Product[]
    tillDivInfo?: TillDivInfo
}

const reducer = (state: InitState, action: Action):InitState => {
    switch(action.type){
        case("GRID_SIZE_CHANGE"):
            if(!action.size) return {...state, till: returnEmptyGrid(5)}
            return {...state, till: returnEmptyGrid(action.size)}
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
            if(!action.tillDivInfo) throw new Error("no tillDivInfo given")
            return{...state, till: modifyTillDiv(state.till, action.tillDivInfo )}
        default: throw new Error(`invalid action type, action type: ${action.type}`)
    }
}

const modifyTillDiv = (till: TillItem[][], tillDivInfo: TillDivInfo):TillItem[][] => {
    const newTill = till
    newTill[tillDivInfo.row][tillDivInfo.column] = tillDivInfo.product
    return newTill
}

const returnEmptyGrid = (size: number) => {
    const array = []
    for(let i = 0; i < size; i++){
        const rowArray = []
        for(let j = 0; j < size; j++){
            rowArray.push(null)
        }
        array.push(rowArray)
    }
    return array
}




export default function Till(){

    const url: string = import.meta.env.VITE_API_URL

    const initialArgs: InitState = {
        till: [],
        displayTill: false,
        areas: [],
        selectedAreaId: undefined,
        products: undefined
    }

    const [state, dispatch] = useReducer(reducer,initialArgs)

    const modifyTillDiv = (tillDivInfo: TillDivInfo) => {
        dispatch({type:"SET_GRID_DIV_PRODUCT", tillDivInfo: tillDivInfo})
    }

    const convertTillItemsToIds = (till: TillItem[][]) => {
        return till.map(row => row.map(tillItem => tillItem ? tillItem._id : null))
    }

    const handleTillSubmit = async() => {

        const data = await fetch(`${url}/area/${state.selectedAreaId}/tillLayout`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({grid: convertTillItemsToIds(state.till)})
        })
        console.log(data.statusText)
    }


    useEffect(() =>{
        dispatch({type: "GRID_SIZE_CHANGE", size: 5})
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