export interface CartItem {
    id: string
    quantity: number
}

export interface CartItemWithID extends CartItem {
    tempID: number
}
export interface ProductInstance {
    _id: string
    area: string
    product: Product
    quantity: number
}

export interface Product {
    _id: string
    name: string
    price: {
        wholesale: number
        retail: number
    }
}

export type area = {
    _id: string,
    name: string,
    user: string
} | null
