import { ProductInstance } from "../Types"

interface Props{
    areaName: string | undefined
    items: ProductInstance[]
    cancelItemTransfer: (id: string) => void
}



export default function ItemsToTransferList({areaName, items,cancelItemTransfer}:Props){


    return(
        <div className="flex flex-col gap-2 w-1/2">
            <h1 className="text-2xl self-center">{areaName ? (areaName) : ("No area selected")}</h1>
            <ul className="flex gap-2">
                {items.map((item) => {
                    return(
                        <li
                            className="w-52 h-60 rounded p-5 bg-zinc800 flex flex-col justify-between" key={item._id}>
                            <div>
                                <p>
                                    {item.product.name}
                                </p>
                                <p>
                                    quantity: {item.quantity}
                                </p>
                            </div>
                             
                            <button className="rounded p-5 bg-zinc600 hover:bg-red600" 
                                onClick={() => cancelItemTransfer(item._id)}>
                                cancel
                            </button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}