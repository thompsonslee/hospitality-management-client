interface Props{
    tillName: string | undefined
    onCancel: () => void
    onConfirm: () => void
}

export default function DeleteTill({tillName,onCancel,onConfirm}: Props){
    return(
        <div className="w-full flex text-white items-center justify-center">
            <div>
                <strong>Are you sure you want to delete {tillName}?</strong>
                <div className="flex gap-2 mt-5">
                    <button className="p-5 w-1/2 rounded bg-zinc800 hover:bg-green600" onClick={() => onConfirm()}>Yes</button>
                    <button className="p-5 w-1/2 rounded bg-zinc800 hover:bg-red600" onClick={() => onCancel()}>No</button>
                </div>
            </div>
        </div>
    )
}