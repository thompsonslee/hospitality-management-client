import { TillItem,HandleClick } from "../Types"

interface props{
    tillItem: TillItem | undefined
    handleClick: HandleClick
    tillGridIndex: {row: number, column: number}
}

export default function TillGridDiv({tillItem = undefined,handleClick,tillGridIndex}: props){
    return(
        <div onClick={(e) => handleClick(e, tillGridIndex)} className="w-full h-full text-center piss flex justify-center items-center tillGridDiv border-solid border-2 min-h-10 min-w-10 overflow-hidden border-black aspect-square">{tillItem?.product.name}</div>
    )
}