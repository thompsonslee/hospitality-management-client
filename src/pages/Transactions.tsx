import { useEffect, useState } from "react"
import { TransactionsWithAreaPopulated } from "../Types"
import Loading from "./Loading"
import TransactionsList from "../components/TransactionsList"

export default function Transactions(){
    const[transactions,setTransactions] = useState<TransactionsWithAreaPopulated[]>([])
    const[status,setStatus] = useState<"loading" | "done">("loading")
    const[page,setPage] = useState(1)
    const url: string = import.meta.env.VITE_API_URL
    console.log(transactions)
    const handleSetPage = (pageNum: number) => {
        setPage(pageNum)
    }

    useEffect(() => {
        const fetchTransactions = async() => {
            const data = await fetch(`${url}/transactions/${page}`,{
                credentials: "include",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                },
            })
            const transactions = await data.json()
            setTransactions(transactions)
            setStatus("done")
        }
        fetchTransactions()
    },[url,page])
    return(
        <>
            {(status === "loading") ? (
                <Loading />
            ) : (
                <div className="m-5 w-full min-w-96">
                    <TransactionsList
                        transactions={transactions}
                        page={page}
                        setPage={handleSetPage}
                    />
                </div>
            )}
        </>
    )
}