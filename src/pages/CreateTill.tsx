import { useParams, useNavigate } from "react-router-dom"
import ProductDropdown from "../components/ProductDropdown"
import TillGrid from "../components/TillGrid"
import { TillItem,area,Product,HandleClick, Clicked, TillLayout } from "../Types"
import { useCallback, useEffect, useReducer } from "react"

interface InitState{
    name: string
    till: TillItem[]
    displayTill: boolean
    size: number
    areas: area[]
    selectedAreaId?: string 
    products?: Product[]
    clicked: false | Clicked
    tillId?: string
}
interface RemoveLocation{
    product: null
    row: number,
    column: number
}
type ActionTypes = 
    'CHANGE_TILL_NAME' |
    'GRID_SIZE_CHANGE' |
    'DISPLAY_TILL' |
    'SET_AREAS' |
    'SET_AREA_ID' |
    'SET_PRODUCTS' |
    'SET_GRID_DIV_PRODUCT'|
    'REMOVE_GRID_DIV_PRODUCT'|
    'SET_CLICKED'|
    'SET_TILLGRID_ID'

interface Action{
    type: ActionTypes
    name?: string
    size?: number
    areas?: area[]
    areaId?: string
    products?: Product[]
    tillItem?: TillItem
    removeLocation?: RemoveLocation
    clicked?: false | Clicked
    tillId?: string
}

const reducer = (state: InitState, action: Action):InitState => {
    switch(action.type){
        case("CHANGE_TILL_NAME"):
            if(typeof action.name != "string") throw new Error("no string given")
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
        case("REMOVE_GRID_DIV_PRODUCT"):
            if(!action.removeLocation) throw new Error("no removeLocation object given")
                return{...state, till: modifyTillDiv(state.till, action.removeLocation)}
        case("SET_CLICKED"):
            if(!action.clicked){
                return{...state, clicked: false}
            }
            return{...state, clicked:action.clicked}
        case("SET_TILLGRID_ID"):
            return{...state, tillId: action.tillId}
        default: throw new Error(`invalid action type, action type: ${action.type}`)
    }
}
const modifyTillDiv = (till: TillItem[], tillItemOrRemoveItem: TillItem | RemoveLocation):TillItem[] => {
    console.log(tillItemOrRemoveItem)
    const updatedTill = till
    for(let i=0; i<updatedTill.length; i++){
        if((updatedTill[i].row === tillItemOrRemoveItem.row) && (updatedTill[i].column === tillItemOrRemoveItem.column)){
            if(tillItemOrRemoveItem.product === null){
                console.log("splicing till")
                updatedTill.splice(i,1)
            }else{
                updatedTill[i].product = tillItemOrRemoveItem.product
            }
            return updatedTill
        }
    }
    if(!tillItemOrRemoveItem.product) return till
    updatedTill.push(tillItemOrRemoveItem)
    return updatedTill
}




export default function Till(){

    const url: string = import.meta.env.VITE_API_URL
    const tillId: string|undefined = useParams().tillLayoutId
    const areaId: string|undefined = useParams().areaId
    const navigate = useNavigate()

    const initialArgs: InitState = {
        name: "",
        till: [],
        size: 5,
        displayTill: false,
        areas: [],
        selectedAreaId: undefined,
        products: undefined,
        clicked: false
    }


    const [state, dispatch] = useReducer(reducer,initialArgs)

    const handleClick:HandleClick = (mouseEvent, tillGridIndex) => {
        console.log("clicked")
        const element = mouseEvent.target as Element
        if(!element.classList.contains("tillGridDiv")){
            dispatch({type:"SET_CLICKED", clicked: false})
        }
        if(!tillGridIndex) throw new Error("tillGridIndex object not given to handleClick function")
        dispatch({type: "SET_CLICKED", clicked: {mouseEvent, tillGridIndex}})
    }
    const modifyTillDiv = (tillItem: TillItem) => {
        dispatch({type:"SET_GRID_DIV_PRODUCT", tillItem: tillItem})
        dispatch({type: "SET_CLICKED", clicked: false})
    }

    const removeTillDiv = (row: number, column: number) => {
        dispatch({type: 'REMOVE_GRID_DIV_PRODUCT', removeLocation: {product: null, row: row, column: column} })
        dispatch({type: "SET_CLICKED", clicked: false})
    }

    const convertTillItemsToIds = (till: TillItem[]) => {
        return till.map((tillItem) => { return({...tillItem, product: tillItem.product._id})} )
    }

    const handleTillSubmit = async() => {
        let method = "POST"
        let path = `${url}/area/${state.selectedAreaId}/tillLayout`

        if(tillId){
            method = "PUT"
            path = path + `/${tillId}`
        }

        const data = await fetch(path, {
            method: method,
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
        if(data.status === 200) navigate("/tillLayouts")
    }

    useEffect(() => {
        if(!areaId || !tillId){
            return
        }
        const fetchAndSetTill = async() => {
            const data = await fetch(`${url}/area/${areaId}/tillLayout/${tillId}`,{
                credentials: "include",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                },
            })
            const till:TillLayout = await data.json()
            dispatch({type: "CHANGE_TILL_NAME", name: till.name})
            dispatch({type: "GRID_SIZE_CHANGE", size: till.size})
            dispatch({type:"SET_AREA_ID", areaId: till.area})
            dispatch({type: "SET_TILLGRID_ID", tillId: till._id})
            till.gridItems.map((gridItem) => {
                dispatch({type: "SET_GRID_DIV_PRODUCT", tillItem: gridItem})
            })
            dispatch({type:"DISPLAY_TILL"})
        }
        fetchAndSetTill()
    },[url,areaId,tillId])

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


    const clickFunctionCallback = useCallback((e:MouseEvent) => {
        if(e.target instanceof Element){
            if(e.target.className.split(" ").includes("NO_CLOSE_ON_CLICK")) return
            dispatch({type:"SET_CLICKED"})
            return
        }
        dispatch({type:"SET_CLICKED"})
    },[])



    const setUpOnClickEventListener = () => {
        document.addEventListener("click",clickFunctionCallback)
    }

    useEffect(() => {
        return () => {
            document.removeEventListener("click",clickFunctionCallback)
        }
    },[clickFunctionCallback])

    return(
        <div className="flex flex-grow justify-center items-center">
            {(state.displayTill) ? (
                <>
                    <TillGrid
                        tillArray={state.till}
                        size={state.size}
                        handleClick={handleClick}
                        >
                            {state.clicked && (
                                <ProductDropdown
                                    clicked={state.clicked}
                                    products={state.products}
                                    modifyTillDiv={modifyTillDiv}
                                    removeTillDiv={removeTillDiv}
                                />
                            )}
                    </TillGrid>
                    <button 
                        className="rounded p-5 text-white bg-zinc800 ml-5 hover:bg-green600 disabled:text-zinc600 disabled:hover:bg-zinc800" 
                        onClick={() => handleTillSubmit()}
                        disabled={state.till.length === 0}
                        >
                        Finish
                    </button>
                </>
            ) : (
                <>
                    <form className="flex flex-col justify-center rounded bg-zinc800 p-5 gap-2 text-white" onSubmit={(e) => {
                        e.preventDefault()
                        setUpOnClickEventListener()
                        dispatch({type: "DISPLAY_TILL"})}}>
                        <div className="flex flex-col">
                            <label>Till Name</label>
                            <input
                                className="p-5 rounded bg-zinc600"
                                required={true}
                                type="text"
                                onChange={(e) => dispatch({type: "CHANGE_TILL_NAME", name: e.target.value})}
                            ></input>
                        </div>
                        <div className="flex flex-col">
                            <label>Select area for till</label>
                            <select 
                                className="p-5 rounded bg-zinc600"
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
                                className="rounded p-5 bg-zinc600"
                                required={true}
                                max={10}
                                min={5}
                                defaultValue={5}
                                type="number" 

                                onChange={(e) => dispatch({type: "GRID_SIZE_CHANGE", size: parseInt(e.target.value)})}>
                            </input>
                        </div>
                        <button className="p-5 mt-5 text-lg rounded bg-zinc600 text-white hover:bg-green600">continue</button>
                    </form>
                </>
            )}

        </div>
    )
}