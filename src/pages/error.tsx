import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function ErrorPage(){
    const error: unknown = useRouteError();
    
    return(
        <div id="error-page">
            <h1>Oops!</h1>
            <p>
                <i>{isRouteErrorResponse(error)
                    ? error.statusText
                    : 'error unknown'
                }</i>
            </p>
        </div>
    );
}