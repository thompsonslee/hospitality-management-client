interface Props{
    data: {cost: number, type: "buy" | "sell"}[]
}

export default function TransactionListAmountColumn({data}:Props){
    return(
        <div className="w-full">
            <ul className="flex flex-col gap-2 mt-4">
                {data.map((item) => {
                    if(item.type === "buy"){
                        return(
                            <li key={Math.random()} className="text-red600">-${item.cost}</li>
                        )
                    }
                    else return(
                        <li  key={Math.random()}className="text-green600 ml-1"> ${item.cost}</li>
                    )
                })}
            </ul>
        </div>
    )
}