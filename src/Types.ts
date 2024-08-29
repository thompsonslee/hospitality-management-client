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
export interface TransactionsWithAreaPopulated extends Omit<Transaction, "area">{
    area: {name: string}
}

export interface TillItem{
    product: Product ,
    row: number,
    column: number
}
export interface TillInstanceItem{
    name?: string
    instance?: ProductInstance 
    row: number,
    column: number
}

export type area = {
    _id: string,
    name: string,
    user: string
} | null

export interface Clicked {
    mouseEvent: React.MouseEvent<HTMLDivElement,MouseEvent>,
    tillGridIndex:{row: number, column: number}
}

export type HandleClick = (
    mouseEvent:React.MouseEvent<HTMLDivElement,MouseEvent>,
    tillGridIndex:{row: number, column: number},
    tillItem?: TillItem | TillInstanceItem
) => void

export interface TillLayout{
    _id: string,
    name: string,
    area: string,
    gridItems: TillItem[]
    size: number
}
export interface TillLayoutWithInstanceItems{
    _id: string,
    name: string,
    area: string,
    gridItems: TillInstanceItem[]
    size: number
}