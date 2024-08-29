import TransactionListColumn from "./TransactionListColumn";
import TransactionListAmountColumn from "./TransactionListAmountColumn";
import { TransactionsWithAreaPopulated } from "../Types";

interface Props{
    transactions: TransactionsWithAreaPopulated[]
    page: number
    setPage: (pageNum: number) => void
}


const formatDate = (date:string) => {
    return date.split("").slice(0,10).join("")
}

export default function TransactionsList({transactions,page,setPage}:Props){
    

    return(
        <div className="flex flex-col text-white bg-zinc700 rounded gap-3">
            <div className="flex bg-zinc600 p-5 rounded-t shadow">
                <strong className="w-full">Date</strong>
                <strong className="w-full">Amount</strong>
                <strong className="w-full">Area</strong>
            </div>
            <div className="flex pr-5 pl-5 pb-5">
                <TransactionListColumn data={transactions.map(item => formatDate(item.Date))} />
                <TransactionListAmountColumn data={transactions.map((item) => ({cost: item.cost, type: item.type}))} />
                <TransactionListColumn data={transactions.map(item => item.area.name)} />
            </div>
            {(page != 1 && transactions.length === 10) && (
                <div className="flex self-end justify-self-end gap-3 mr-5 mb-5">
                    <button 
                        disabled={page === 1}
                        className="rounded p-3 border border-zinc600 disabled:text-zinc600 disabled:hover:bg-zinc700 hover:bg-zinc600"
                        onClick={() => setPage(page - 1)}
                    >prev</button>
                    <button 
                        disabled={transactions.length < 10}
                        className="rounded p-3 border border-zinc600 disabled:text-zinc600 disabled:hover:bg-zinc700 hover:bg-zinc600"
                        onClick={() => setPage(page + 1)}>next</button>
                </div>
            )}

        </div>
    )
}