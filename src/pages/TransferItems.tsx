import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ProductInstance, area } from "../Types"
import TransferItemsList from "../components/TransferItemsList"
import ItemsToTransferList from "../components/ItemsToTransferList"

export default function TransferItems(){
    const [area, setArea] = useState<area>()
    const [selectedAreaId, setSelectedAreaId] = useState("")
    const [allAreas, setAllAreas] = useState<area[]>([])
    const [currAreaItems, setCurrAreaItems] = useState<ProductInstance[]>([])
    const [nextAreaItems, setNextAreaItems] = useState<ProductInstance[]>([])

    const navigate = useNavigate()
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
        navigate(`/area/${areaId}`)
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
            <div className="flex flex-col items-center justify-between w-full h-screen p-5">
                <div className="flex text-white m-5 gap-10 w-full">
                    <TransferItemsList 
                        areaName={area?.name}
                        items={currAreaItems} 
                        transferItem={transferItem} 
                    />
                    <ItemsToTransferList 
                        areaName={allAreas.find(area => area?._id === selectedAreaId)?.name}
                        items = {nextAreaItems} 
                        cancelItemTransfer={cancelItemTransfer}
                    />
                </div>
                <div className="flex justify-self-end gap-2 self-end">
                    <select className="rounded p-5 bg-zinc600 text-white" defaultValue={""} onChange={(e) => newAreaIdHandler(e.target.value)} >
                        <option disabled value={""}>Choose Area to transfer</option>
                        {allAreas.map((area) => {
                            return(
                                <option key={area?._id} value={area?._id}>{area?.name}</option>
                            )
                        })}

                    </select>
                    <button className="rounded p-5 bg-zinc600 text-white hover:bg-green600" onClick={() => submitHandler()}>submit</button>
                </div>
            </div>

        </>
    )
}