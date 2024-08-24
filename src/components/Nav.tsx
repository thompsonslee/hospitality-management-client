import { Link } from "react-router-dom"
export default function Nav(){
    return(
        <div className="h-screen max-w-72 bg-zinc800 w-full">
            <ul className="flex flex-col gap-5 justify-stretch items-stretch p-2">
                <li className="flex items-stretch">
                    <Link className="bg-zinc600 text-center w-full p-2 rounded text-white hover:bg-green600" to="/">Home</Link>
                </li>
                <li className="flex items-stretch">
                    <Link className="bg-zinc600 text-center w-full p-2 rounded text-white hover:bg-green600" to="/areas">Areas</Link>
                </li>
                <li className="flex items-stretch">
                    <Link className="bg-zinc600 text-center w-full p-2 rounded text-white hover:bg-green600" to="/transactions">Transactions</Link>
                </li>
                <li className="flex items-stretch">
                    <Link className="bg-zinc600 text-center w-full p-2 rounded text-white hover:bg-green600" to="/tillLayouts">Tills</Link>
                </li>
            </ul>

        </div>
    )
}