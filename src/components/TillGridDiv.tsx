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
            onClick={
                (e) => handleClick(e, tillGridIndex, tillItem)
            } 
            className="w-full h-full text-center flex justify-center items-center tillGridDiv border-solid border-2 min-h-10 min-w-10 overflow-hidden border-black aspect-square"
            >
                {render(tillItem)}
        </div>
    )
}