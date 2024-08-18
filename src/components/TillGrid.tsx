import { TillItem, HandleClick, TillInstanceItem} from "../Types";
import TillGridDiv from "./TillGridDiv";

interface Props{
    tillArray: TillItem[]| TillInstanceItem[]
    size: number
    handleClick: HandleClick
    children?: React.ReactNode
}



export default function TillGrid({tillArray, size, handleClick, children}:Props){

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
                    handleClick={handleClick}
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
        <div className="aspect-square h-full flex" >
            <div className="flex flex-col flex-grow aspect-square max-h-[80vh]">
                {
                    renderGrid()
                }
            </div>
            {children}
        </div>
    )
}