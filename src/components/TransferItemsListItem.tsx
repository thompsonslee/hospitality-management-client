import { ProductInstance } from "../Types"
import { useState } from "react"
interface Props{
    item: ProductInstance
    transferItem: (id: string,qty: number) => void
    isOpen: boolean
    setIsOpen: (id: string | null) => void
}


export default function TransferItemsListItem({item,transferItem,isOpen,setIsOpen}:Props){
    const [quantity,setQuantity] = useState(1)

    return(
        <div className="flex flex-col rounded p-5 justify-between items-center bg-zinc800 w-full h-full">
            <div>
                <p>{item.product.name}</p>
                <p>quantity: {item.quantity}</p>
            </div>
            <div className="flex flex-col items-center w-full gap-2">
                {isOpen ? (
                    <>
                        <input
                            className="text-white bg-zinc600 p-3 rounded w-full"
                            value={quantity}
                            type="number" 
                            max={item.quantity}
                            onChange={(e)=> setQuantity(parseInt(e.target.value))}
                        >
                        </input>
                        <div className="flex justify-between gap-2">
                            <button
                                className="rounded p-3 bg-zinc600 hover:bg-green600 w-1/2"
                                onClick={() => {
                                    transferItem(item._id, quantity)
                                    setIsOpen(null)
                            }}>Transfer</button>
                            <button 
                                className="rounded p-3 bg-zinc600 hover:bg-red600 w-1/2" 
                                onClick={() => setIsOpen(null)}>
                                Cancel
                            </button>
                        </div>
                    </>
                ) : (
                    <button className="rounded p-5 bg-zinc600 hover:bg-green600" onClick={() => setIsOpen(item._id)}>Transfer</button>
                )}
            </div>
        </div>
    )
}