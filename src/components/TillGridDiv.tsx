import { TillItem,HandleClick,TillInstanceItem} from "../Types"

interface props{
    tillItem: TillItem | undefined | TillInstanceItem
    handleClick: HandleClick
    tillGridIndex: {row: number, column: number}
}
const render = (item: TillItem | undefined | TillInstanceItem) => {
    if(!item) return <></>
    if('product' in item){
        return item.product.name
    }
    else{
        if(item.instance){
            if(item.instance.quantity === 0) return(`${item.instance.product.name} SOLD OUT`)
            return item.instance.product.name
        }
        return(`${item.name} SOLD OUT`)
    }
}

export default function TillGridDiv({tillItem = undefined,handleClick,tillGridIndex}: props){
    return(
        <div 
            className="w-full h-full text-center flex
             tillGridDiv border-solid min-h-10 min-w-10 overflow-hidden 
             border-black aspect-square"
            >
            <div  
                className="flex items-center justify-center w-full h-full rounded bg-zinc800 m-1 mt-2 "          
                onClick={
                (e) => handleClick(e, tillGridIndex, tillItem)
            }>
                {render(tillItem)}
            </div>

        </div>
    )
}