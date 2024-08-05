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

export interface Transaction {
    type: "buy"|"sell"
    cost: number
    user: string
    area: string
    Date: string
}
export type TillItem = Product | null

export type area = {
    _id: string,
    name: string,
    user: string
} | null

export interface TillDivInfo{product: Product, row: number, column: number}

export interface Clicked {
    mouseEvent: React.MouseEvent<HTMLDivElement,MouseEvent>,
    tillGridIndex:{row: number, column: number}
}