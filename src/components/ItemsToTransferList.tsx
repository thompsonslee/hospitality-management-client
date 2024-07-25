import { ProductInstance,area } from "../Types"

interface Props{
    items: ProductInstance[]
    cancelItemTransfer: (id: string) => void
    areas: area[]
    setAreaId: (id: string) => void
}



export default function ItemsToTransferList({items,cancelItemTransfer,areas,setAreaId}:Props){

    const onChangehandler = (e:React.ChangeEvent<HTMLSelectElement>) => {
        setAreaId(e.target.value)
    }

    return(
        <div>
            <select defaultValue={""} onChange={(e) => onChangehandler(e)} >
                <option disabled value={""}>Choose Area to transfer</option>
                {areas.map((area) => {
                    return(
                        <option key={area?._id} value={area?._id}>{area?.name}</option>
                    )
                })}

            </select>
            <ul>
                {items.map((item) => {
                    return(
                        <li key={item._id}>
                            {item.product.name} quantity: {item.quantity}
                            <button onClick={() => cancelItemTransfer(item._id)}>cancel</button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}