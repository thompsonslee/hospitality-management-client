interface Props {
    name: string,
    data: string,
    type: string,
    onChange: React.ChangeEventHandler
}

export default function userFormElement({name,data,type,onChange}:Props){
    return(
        <div>
            <label htmlFor={name}>{name}</label>
            <input
                required
                name={name}
                type={type}
                value={data}
                onChange={onChange}>
            </input>
        </div>
    )
}