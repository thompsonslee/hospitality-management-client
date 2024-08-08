import { Product,Clicked,TillItem } from "../Types"

interface props{
    clicked: Clicked
    products: Product[] | undefined
    modifyTillDiv: (tillITem: TillItem) => void
}



export default function ProductDropdown({clicked,products,modifyTillDiv}:props){
    const handleSelect = (product:Product) => {
        modifyTillDiv({product: product,row: clicked.tillGridIndex.row,column: clicked.tillGridIndex.column})
    }
    return(
    <div style={{left: clicked.mouseEvent.clientX, top: clicked.mouseEvent.clientY}} className="absolute w-40 h-60 border-s-black">
        {products?.map((product) => {
            return <div key={product._id} onClick={() => handleSelect(product)}>{product.name}</div>
        })}
    </div>)
}