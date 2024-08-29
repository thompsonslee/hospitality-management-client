interface Props{
    data: string[]
}

export default function TransactionListColumn({data}:Props){
    console.log(data)

    return(
        <div className="w-full">
            <ul className="flex flex-col gap-2 mt-4">
                {data.map((item) => {
                    return <li key={Math.random()}>{item ? item : "No Data"}</li>
                })}
            </ul>
        </div>
    )
}