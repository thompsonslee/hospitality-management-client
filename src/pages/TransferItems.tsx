import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ProductInstance, area } from "../Types"
import TransferItemsList from "../components/TransferItemsList"
import ItemsToTransferList from "../components/ItemsToTransferList"

export default function TransferItems(){
    const [area, setArea] = useState<area>()
    const [selectedAreaId, setSelectedAreaId] = useState("")
    const [allAreas, setAllAreas] = useState<area[]>([])
    const [currAreaItems, setCurrAreaItems] = useState<ProductInstance[]>([])
    const [nextAreaItems, setNextAreaItems] = useState<ProductInstance[]>([])

    const areaId = useParams().areaId
    const url: string = import.meta.env.VITE_API_URL

    const transferItem = (id:string, qty: number) => {
        const itemIndex = currAreaItems.findIndex((item) => item._id === id)
        const item = currAreaItems[itemIndex]

        const nextAreaIndex = nextAreaItems.findIndex((movedItem) => movedItem._id === item._id)
        if (nextAreaIndex === -1) {
            setNextAreaItems(nextAreaItems.concat([{...item, quantity: qty}]))
        } else {
            setNextAreaItems(nextAreaItems.map((currItem,index) => index === nextAreaIndex ? Object.assign(currItem,{quantity: currItem.quantity + qty }) : currItem))
        }
        
        if (currAreaItems[itemIndex].quantity === qty){
            setCurrAreaItems(currAreaItems.filter((currItem) => currItem._id != item._id))
        } else { 
            setCurrAreaItems(currAreaItems.map((currItem,index) => index === itemIndex ? Object.assign(currItem, {quantity: currItem.quantity - qty}): currItem))
        }

    }

    const cancelItemTransfer = (id: string) => {
        const nextAreaIndex = nextAreaItems.findIndex((movedItem) => movedItem._id === id)
        const qty = nextAreaItems[nextAreaIndex].quantity

        const currentAreaIndex = currAreaItems.findIndex((currItem) => currItem._id === id)
        if(currentAreaIndex === -1){
            setCurrAreaItems(currAreaItems.concat([nextAreaItems[nextAreaIndex]]))
        }
        else setCurrAreaItems(currAreaItems.map((currItem,index) => index === currentAreaIndex ? Object.assign(currItem, {quantity: currItem.quantity + qty}) : currItem))

        setNextAreaItems(nextAreaItems.filter((currItem) => currItem._id != id))

    }
    const newAreaIdHandler = (areaId: string) => {
        setSelectedAreaId(areaId)
    }

    const convertToValidBody = (array: ProductInstance[]) => {
        return array.map((instance) => (
            {
                id: instance.product._id,
                quantity: instance.quantity
            }
        ))
    }

    const handleSuccess = () => {
        console.log("success")
    }
    const handleFailure = (response: Response) => {
        console.log(response.status)
        console.log(response.statusText)
    }
    const submitHandler = async() => {
        console.log(selectedAreaId)
        if(!selectedAreaId){
            console.log("no area selected")
            return
        }

        const response = await fetch(`${url}/area/${areaId}/transfer/${selectedAreaId}`,{
            method: "post",
            credentials: "include",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({products: convertToValidBody(nextAreaItems)})
        })
        if (response.status === 200) handleSuccess()
        else handleFailure(response)
    }



    useEffect(() => {
        const fetchItems = async() => {
            const [areaData, allAreasData] = await Promise.all(
                [
                    fetch(`${url}/area/${areaId}`,{
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json; charset=UTF-8"
                        },
                    })
                ,
                    fetch(`${url}/area`, {
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json; charset=UTF-8"
                        },
                    })
                ]
            )
            const {area, productInstances} = await areaData.json()
            setArea(area);
            setCurrAreaItems(productInstances)

            const allAreas = await allAreasData.json()
            setAllAreas(allAreas)
        }
        fetchItems()
    },[areaId,url])
    return(
        <>
            <div className="flex border border-solid" >
                <TransferItemsList 
                    items={currAreaItems} 
                    transferItem={transferItem} 
                />
                <ItemsToTransferList 
                    items = {nextAreaItems} 
                    cancelItemTransfer={cancelItemTransfer}
                    areas={allAreas}
                    setAreaId ={newAreaIdHandler}
                />
            </div>
            <button onClick={() => submitHandler()}>submit</button>
        </>
    )
}