import { ProductInstance, TillItem, TillInstanceItem, Product} from "../Types"

interface CartItem{
    product: Product
    quantity: number
}

export const convertTillItemsToTillInstanceItems = (productInstances:ProductInstance[], tillItems: TillItem[]):TillInstanceItem[] => {
    return tillItems.map((tillItem) => {
        const instance = productInstances.find((instance) => instance.product._id === tillItem.product._id)
        if(instance) return {
            instance: instance,
            row: tillItem.row,
            column: tillItem.column
        }
        else return{
            name: tillItem.product.name,
            row: tillItem.row,
            column: tillItem.column
        }
    })
}

export const createUpdatedCartAndGridItems = (itemId: string, gridItems:TillInstanceItem[], cart: CartItem[]) => {
    const newGridItems = gridItems
    const newCart = cart

    const tillItemIndex = gridItems.findIndex((item) => item.instance?._id === itemId)
    const tillItem = gridItems.find((item) => item.instance?._id === itemId)

    if(!tillItem?.instance) throw new Error("tillItem not found")
    
    if(!newGridItems[tillItemIndex].instance) throw new Error("instance not found")

    newGridItems[tillItemIndex].instance.quantity = tillItem.instance.quantity - 1

    const productId = tillItem.instance.product._id
    
    const cartItemIndex = newCart.findIndex(item =>  item.product._id === productId)
    if(cartItemIndex === -1){
        newCart.push({
            product: tillItem.instance.product,
            quantity: 1
        })
    }else{
        newCart[cartItemIndex].quantity++
    }
    return{newGridItems,newCart}
}

const handleSubmit = () => {
    
}
