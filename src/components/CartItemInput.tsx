import { CartItemWithID, Product } from "../Types"



interface Props{
    cartItem: CartItemWithID,
    products: Product[]
    handleInputChange: (value: string|number, tempID: number) => void
    deleteInput: (id:number) => void
}


export default function cartItemInput({cartItem,products,handleInputChange,deleteInput}:Props){
    const onChange = (e:React.ChangeEvent<HTMLSelectElement>|React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.className === "quantity"){
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
        <div>
            <label>Product</label>
            <select className="product" value={cartItem.id} onChange={onChange}>
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
            <label>Quantity</label>
            <input className="quantity" type="number" value={cartItem.quantity} onChange={onChange}></input>
            <button onClick={onDelete}>Delete</button>
        </div>
    )
}