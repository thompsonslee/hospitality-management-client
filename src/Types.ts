export interface CartItem {
    id: string,
    quantity: number
}

export interface CartItemWithID extends CartItem {
    tempID: number
}

export interface Product {
    _id: string,
    name: string,
    price: {
        wholesale: number,
        retail: number
    }
}