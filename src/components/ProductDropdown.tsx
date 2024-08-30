import { useEffect, useState } from "react"
import { Product,Clicked,TillItem } from "../Types"

interface props{
    clicked: Clicked
    products: Product[] | undefined
    modifyTillDiv: (tillItem: TillItem) => void
    removeTillDiv: (row:number,column:number) => void
}



export default function ProductDropdown({clicked,products,modifyTillDiv, removeTillDiv}:props){
    console.log(clicked)
    const [position,setPosition] = useState({x: clicked.mouseEvent.clientX, y: clicked.mouseEvent.clientY})
    const handleSelect = (product:Product) => {
        modifyTillDiv({product: product,row: clicked.tillGridIndex.row,column: clicked.tillGridIndex.column})
    }


    useEffect(() => {
        setPosition({x: clicked.mouseEvent.clientX, y: clicked.mouseEvent.clientY})
    },[clicked])

    useEffect(() => {
        //if not enough space to render below cursor, will render above cursor
        const flipDropdownIfNoSpace = () => {
            const ulElement = document.getElementById("dropdown")
            if(!ulElement) {console.log("no ulElement"); return}
            if(ulElement.clientHeight + position.y > window.innerHeight){
                setPosition({...position, y: position.y - ulElement.clientHeight})
            }
        }
        flipDropdownIfNoSpace()
    },[position])
    return(
    <ul 
        style={{left: position.x, top: position.y}} 
        id="dropdown"
        
        className="dropDownScrollBar NO_CLOSE_ON_CLICK flex flex-col absolute max-w-80 border-s-black
         bg-zinc700 rounded p-5 gap-2 border border-solid overflow-y-scroll max-h-96">
        <li 
            className="bg-red400 p-3 rounded hover:bg-red600 NO_CLOSE_ON_CLICK"
            onClick={() => removeTillDiv(clicked.tillGridIndex.row,clicked.tillGridIndex.column)}
            >Remove
        </li>
        {products?.map((product) => {
            return <li
                className="bg-zinc600 p-3 rounded hover:bg-green600 NO_CLOSE_ON_CLICK"
                key={product._id} 
                onClick={() => handleSelect(product)}
                >{product.name}
            </li>
        })}
    </ul>)
}