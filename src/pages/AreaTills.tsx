import { useParams } from "react-router-dom"

export default function AreaTills(){
    const areaId = useParams().areaId
    return(
        <div>{areaId} tills</div>
    )
}