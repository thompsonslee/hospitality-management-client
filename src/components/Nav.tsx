import { Link } from "react-router-dom"
export default function Nav(){
    return(
        <div>
            <Link to="/areas">Areas</Link>
            <Link to="/orderItems">Order Items</Link>
        </div>
    )
}