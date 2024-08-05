import { TillItem,Product, TillDivInfo, Clicked} from "../Types";
import ProductDropdown from "./ProductDropdown";
import TillGridDiv from "./TillGridDiv";
import { useEffect, useState } from "react";

interface Props{
    tillArray: TillItem[][]
    products: Product[] | undefined
    modifyTillDiv: (tillDivInfo: TillDivInfo) => void
}



export default function TillGrid({tillArray, products, modifyTillDiv}:Props){
    const [clicked, isClicked] = useState<Clicked | null>(null)

    const handleDivClick = (e: React.MouseEvent<HTMLDivElement,MouseEvent>, tillGridIndex:{row: number, column: number}) => {
        isClicked({mouseEvent: e,tillGridIndex:tillGridIndex})
    }

    useEffect(() => {
        document.addEventListener("click",(e) => {
            const element = (e.target as Element)
            if(!element.classList.contains("tillGridDiv")){
                isClicked(null)
            }
        })
    },[])

    return(
        <div className="aspect-square w-full m-8">
            {clicked && <ProductDropdown clicked={clicked} products={products} modifyTillDiv={modifyTillDiv} />}
            <div className="flex flex-col flex-grow aspect-square max-h-[80vh]">{
                tillArray.map((row,rowIndex) => {
                    //row
                    return <div className="flex flex-grow" key={Math.random()}> 
                        {
                            row.map((tillItem,columnIndex) => {
                                return (
                                <TillGridDiv 
                                    tillItem={tillItem}
                                    key={Math.random()}
                                    onClick={handleDivClick}
                                    tillGridIndex={{row: rowIndex,column: columnIndex}}
                                />
                                )
                            })
                        }
                    </div>
                })
            }</div>

        </div>
    )
}