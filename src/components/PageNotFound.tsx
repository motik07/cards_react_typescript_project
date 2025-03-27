import { FunctionComponent } from "react";

interface PageNotFoundProps {
    
}
 
const PageNotFound: FunctionComponent<PageNotFoundProps> = () => {
    return ( 
        <div className="col-12 d-flex align-items-center justify-content-center">
            <h1>page not found!</h1>
        </div>
     );
}
 
export default PageNotFound;