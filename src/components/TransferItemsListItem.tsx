import { ProductInstance } from "../Types"
import { useState } from "react"
interface Props{
    item: ProductInstance
    transferItem: (id: string,qty: number) => void
}


export default function TransferItemsListItem({item,transferItem}:Props){
    const [quantity,setQuantity] = useState(1)

    return(
        <div>
            {item.product.name} quantity: {item.quantity}
            <input 
                value={quantity}
                type="number" 
                max={item.quantity}
                onChange={(e)=> setQuantity(parseInt(e.target.value))}
            >
            </input>
            <button onClick={() => transferItem(item._id, quantity)}>Transfer</button>
        </div>
    )
}