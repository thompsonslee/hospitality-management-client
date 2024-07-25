import TransferItemsListItem from "./TransferItemsListItem"
import { ProductInstance } from "../Types"

interface Props {
    items: ProductInstance[]
    transferItem: (id: string,qty: number) => void
}

export default function TransferItemsList({items, transferItem}:Props){

    return(
        <>
            <ul>
                {items.map((item) => {
                    return(
                        <li key={item._id}>
                            <TransferItemsListItem item={item} transferItem={transferItem}/>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}