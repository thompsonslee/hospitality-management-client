import TransferItemsListItem from "./TransferItemsListItem"
import { ProductInstance } from "../Types"
import { useState } from "react"

interface Props {
    areaName?: string
    items: ProductInstance[]
    transferItem: (id: string,qty: number) => void
}

export default function TransferItemsList({areaName, items, transferItem}:Props){

    const [selectedItem, setSelectedItem] = useState<null | string>(null)

    const handleSetSelect = (id: string | null) => {
        setSelectedItem(id)
    }

    return(
        <div className="flex flex-col gap-2 w-1/2">
            <h1 className="text-2xl self-center">{areaName}</h1>
            <ul className="flex gap-2">
                {items.map((item) => {
                    return(
                        <li
                            className="w-52 h-60"
                            key={item._id}>
                            <TransferItemsListItem
                                item={item}
                                transferItem={transferItem}
                                isOpen={selectedItem === item._id}
                                setIsOpen={handleSetSelect}
                            />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}