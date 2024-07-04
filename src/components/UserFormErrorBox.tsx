type props = {
    error: string
}

export default function ErrorBox({error}:props){
    return(
        <div>{error}</div>
    )
}