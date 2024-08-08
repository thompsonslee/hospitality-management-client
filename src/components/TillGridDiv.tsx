import { TillItem } from "../Types"

interface props{
    tillItem: TillItem | undefined
    onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>,  tillGridIndex:{row: number, column: number}) => void
    tillGridIndex: {row: number, column: number}
}

export default function TillGridDiv({tillItem = undefined,onClick,tillGridIndex}: props){
    return(
        <div onClick={(e) => onClick(e, tillGridIndex)} className="w-full h-full text-center piss flex justify-center items-center tillGridDiv border-solid border-2 min-h-10 min-w-10 overflow-hidden border-black aspect-square">{tillItem?.product.name}</div>
    )
}