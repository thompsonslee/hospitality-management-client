type props = {
    error: string
}

export default function ErrorBox({error}:props){
    return(
        <div className="bg-red600 text-white p-2 rounded mb-3">
            <strong>An Error Occured</strong>
            <p>{error}</p>
        </div>
    )
}