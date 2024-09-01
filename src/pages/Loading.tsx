export default function Loading(){


    return(
        <div className="flex justify-center items-center h-screen w-full">
            <div className="loadingDotsContainer flex justify-between w-20">
                <div className="loadingDot bg-green600"></div>
                <div className="loadingDot bg-green600"></div>
                <div className="loadingDot bg-green600"></div>
            </div>
        </div>
    )
}