import { useEffect, useState } from "react"
import { Transaction } from "../Types"
import { getMonthSales, getTodaysSales,getWeeksSales, getYearSales } from "../utility/transactionFunctions"
import Loading from "./Loading"

export default function Transactions(){
    const[transactions,setTransactions] = useState<Transaction[]>([])
    const[status,setStatus] = useState("loading")
    const url: string = import.meta.env.VITE_API_URL
    console.log(transactions)

    useEffect(() => {
        const fetchTransactions = async() => {
            const data = await fetch(`${url}/transaction`,{
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
    },[url])
    return(
        <>
            {(status === "loading") ? (
                <Loading />
            ) : (
                <div>
                    Todays Sales: {getTodaysSales(transactions)}
                    This Weeks Sales: {getWeeksSales(transactions)}
                    This Month Sales: {getMonthSales(transactions)}
                    This Years Sales: {getYearSales(transactions)}
                </div>
            )}
        </>
    )
}