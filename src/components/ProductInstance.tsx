type props = {
    productInstance: productInstance
}

type productInstance = {
    _id: string,
    area: string,
    product: {
        name: string,
        price: {
            retail: number,
            wholesale: number
        }
    },
    quantity: number
}

export default function ProductInstance({productInstance}: props){

    return(
        <div>
            <div>{productInstance.product.name}</div>
            <div>{productInstance.quantity}</div>
        </div>
    )
}