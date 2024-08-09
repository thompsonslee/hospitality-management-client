import { useEffect, useReducer } from "react"
import { TillLayout } from "../Types"
import { useParams } from "react-router-dom"
import TillGrid from "../components/TillGrid"
const url: string = import.meta.env.VITE_API_URL

interface State{
    errors: {message: string} | null
    till: TillLayout | null
}

type ActionType =
    "SET_ERROR"
    |"SET_TILL"


interface Action{
    type: ActionType
    errormsg?: string
    till?: TillLayout
}

const initialArgs:State = {
    errors: null,
    till: null
}
const reducer = (state:State, action:Action):State => {
    switch(action.type){
        case("SET_ERROR"):
            if(!action.errormsg) return{...state,errors:{message: "undefined error"}}
            return{...state, errors:{message: action.errormsg}}
        case("SET_TILL"):
            if(!action.till) throw new Error("action.till is not defined")
            return{...state, till: action.till}
    }
    
}




export default function Till(){
    const {areaId, tillLayoutId} = useParams()
    const [state,setState] = useReducer(reducer, initialArgs)

    useEffect(() => {
        const fetchAndSetTill = async() => {
            try{
                const till = await fetch(`${url}/area/${areaId}/tillLayout/${tillLayoutId}`,{
                    credentials: "include",
                    headers: {
                        "content-type": "application/json;charset=UTF-8"
                    }
                })
                setState({type:"SET_TILL", till: await till.json()})
            }catch(e){
                setState({type:"SET_ERROR", errormsg:"failed to get till"})
            }
        }
        fetchAndSetTill()
    },[areaId, tillLayoutId])
    return(
        <>
            {state.errors && (<div>Error</div>)}
            {(!state.till) ? (
                <div>loading</div>
            ) : (
                <TillGrid />
            )}
        </>
    )
}