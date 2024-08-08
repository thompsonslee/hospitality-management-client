import { TillItem,Product, Clicked} from "../Types";
import ProductDropdown from "./ProductDropdown";
import TillGridDiv from "./TillGridDiv";
import { useEffect, useState } from "react";

interface Props{
    tillArray: TillItem[]
    size: number
    products: Product[] | undefined
    modifyTillDiv: (tillItem: TillItem) => void
}



export default function TillGrid({tillArray, size, products, modifyTillDiv}:Props){
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

    const getTillItemAtIndex = (row:number,column:number) => {
        return tillArray.find((tillItem) => tillItem.row === row && tillItem.column === column)
    }

    const renderChildren = (i: number) => {
        const row = []
        for(let j = 0; j < size; j++){
            row.push(
                <TillGridDiv 
                    tillItem={getTillItemAtIndex(i,j)}
                    tillGridIndex={{row:i,column:j}}
                    onClick={handleDivClick}
                    key={Math.random()}

                />
            )
        }
        return row
    }
    const renderGrid = () => {
        const grid = []
        for(let i = 0; i< size; i++){
            grid.push(
                <div className="flex flex-grow" key={Math.random()}>
                    {renderChildren(i)}
                </div>
            )
        }
        return grid

    }
    return(
        <div className="aspect-square w-full m-8">
            {clicked && <ProductDropdown clicked={clicked} products={products} modifyTillDiv={modifyTillDiv} />}
            <div className="flex flex-col flex-grow aspect-square max-h-[80vh]">
                {
                    renderGrid()
                }
            </div>

        </div>
    )
}