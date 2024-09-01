interface Props {
    name: string,
    data: string,
    type: string,
    onChange: React.ChangeEventHandler
    label?: string,
}

export default function userFormElement({name,data,type,onChange,label}:Props){
    return(
        <div className="flex flex-col gap-1 mb-2">
            <label htmlFor={name}>{label? label : name}</label>
            <input
                className="bg-zinc600 p-2 border-solid border-white border rounded text-white"
                required
                name={name}
                type={type}
                value={data}
                onChange={onChange}>
            </input>
        </div>
    )
}