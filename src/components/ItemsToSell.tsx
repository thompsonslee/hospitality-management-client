import { Product } from "../Types"

interface CartItem{
    product: Product
    quantity: number
}

interface Props{
    cart: CartItem[]
    onCancel: () => void
    onSubmit: () => void
}

export default function ItemsToSell({cart, onCancel, onSubmit}:Props){

    const getTotalCost = () => {
        return cart.reduce((cost, cartItem) => {
            console.log(cost, cartItem)
            return cost + (cartItem.quantity * cartItem.product.price.retail)
        },0)
    }
    return(
        <div className="flex flex-col justify-between text-white min-w-96 p-5 rounded bg-zinc800 ml-2 mt-2 mb-2">
            <ul>
                <li className="flex mb-3">
                    <div className="w-1/2">Item</div>
                    <div className="w-1/4">Quantity</div>
                    <div className="w-1/4">Price</div>
                </li>
                {cart.map((cartItem) => {
                    return(
                        <li
                            className="flex"
                            key={Math.random()}>
                            <div className="w-1/2">
                                {cartItem.product.name}
                                
                            </div>
                            <div className="w-1/4 flex items-end">
                                {cartItem.quantity}
                            </div>
                            <div className="w-1/4">
                                ${cartItem.quantity * cartItem.product.price.retail}
                            </div>
                        </li>
                    )
                })}
            </ul>
            <div className="flex flex-col justify-center">
                <div>total: ${getTotalCost()}</div>
                <div className="flex justify-center gap-2">
                    <button className="flex flex-grow justify-center items-center p-5 bg-zinc600 rounded hover:bg-green600"onClick={() => onSubmit()}>Submit</button>
                    <button className="flex flex-grow justify-center items-center p-5 bg-zinc600 rounded hover:bg-red600"  onClick={() => onCancel()}>Cancel</button>
                </div>
            </div>
        </div>
    )
}