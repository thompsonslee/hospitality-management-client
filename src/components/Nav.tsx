import { Link } from "react-router-dom"
export default function Nav(){
    return(
        <div className="h-screen bg-zinc600 tex max-w-72 w-full flex justify-center text-white p-10">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/areas">Areas</Link>
                </li>
                <li>
                    <Link to="/transactions">Transactions</Link>
                </li>
                <li>
                    <Link to="/tillLayouts">Tills</Link>
                </li>
            </ul>

        </div>
    )
}