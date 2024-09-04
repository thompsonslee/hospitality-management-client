import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function ErrorPage(){
    const error: unknown = useRouteError();
    console.log(error)
    
    return(
        <div className="flex justify-center items-center h-screen text-white" id="error-page">
            
            <div>
                <h1 className="text-3xl mb-3">Oops!</h1>
                <p>
                    {isRouteErrorResponse(error) ? (
                        `${error.status}: ${error.statusText}`
                    ) : (
                        "unknown error"
                    )} 
                </p>
            </div>
        </div>
    );
}