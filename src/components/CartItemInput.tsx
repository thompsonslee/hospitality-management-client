import { CartItemWithID, Product } from "../Types"

interface Props{
    cartItem: CartItemWithID,
    products: Product[]
    handleInputChange: (value: string|number, tempID: number) => void
    deleteInput: (id:number) => void
}


export default function cartItemInput({cartItem,products,handleInputChange,deleteInput}:Props){
    const onChange = (e:React.ChangeEvent<HTMLSelectElement>|React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.type === "number"){
            const value = parseInt(e.target.value)
            handleInputChange(value,cartItem.tempID)
            return
        }
        handleInputChange(e.target.value,cartItem.tempID)
    }
    const onDelete = (e:React.MouseEvent) => {
        e.preventDefault()
        deleteInput(cartItem.tempID)
    }

    return(
        <div className="rounded flex flex-col w-72 h-80 bg-zinc800 p-5 gap-2">
            <div className="flex flex-col">
                <label>Product</label>
                <select className="product p-5 rounded bg-zinc600 text-white" required={true} value={cartItem.id} onChange={onChange}>
                    <option disabled={true} selected={true} value = "">Select Product</option>
                    {products.map((product) => {
                        return(
                            (cartItem.id === product._id) ? (
                                <option key={product._id} value={product._id } selected={true} >{product.name}</option>
                            ) : (
                                <option key={product._id} value={product._id }>{product.name}</option>
                            )

                        )
                    })}
                </select>
            </div>
            <div className="flex flex-col">
                <label>Quantity</label>
                <input className="p-5 rounded bg-zinc600 text-white" required={true} type="number" value={cartItem.quantity} onChange={onChange}></input>
            </div>
            <button className="rounded p-5 bg-red600 text-white mt-4" onClick={onDelete}>Delete</button>
        </div>
    )
}