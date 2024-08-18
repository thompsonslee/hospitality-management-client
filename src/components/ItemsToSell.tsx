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
            return cost + (cartItem.quantity * cartItem.product.price.retail)
        },0)
    }
    return(
        <div className="flex flex-col justify-between min-w-56 border-2 border-solid border-black">
            <ul>
                {cart.map((cartItem) => {
                    return(
                        <li key={Math.random()}>
                            <div>
                                {cartItem.product.name}
                                {cartItem.quantity}
                            </div>
                        </li>
                    )
                })}
            </ul>
            <div className="flex flex-col justify-center">
                <div>total: {getTotalCost()}</div>
                <div className="flex justify-center">
                    <button className="flex flex-grow justify-center items-center p-5 "onClick={() => onSubmit()}>Submit</button>
                    <button className="flex flex-grow justify-center items-center p-5" onClick={() => onCancel()}>Cancel</button>
                </div>
            </div>
        </div>
    )
}