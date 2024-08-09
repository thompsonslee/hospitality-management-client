import { Link } from "react-router-dom"
export default function Nav(){
    return(
        <div className="h-screen bg-slate-600 max-w-72 w-full flex justify-center p-10">
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