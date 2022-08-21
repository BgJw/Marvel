import { Link } from "react-router-dom";
import ErrorMesage from "../ErrorMesage/ErrorMesage";


const Page404 = () => {
    return (
        <>
            <ErrorMesage />
            <p>Page doesn`t exist</p>
            <Link style={ {'display': 'block', 'textAlign': 'center', 'fontSize': '24px', 'border': '1px solid black', 'padding': '5px'}} 
                  to="/">
                    Back to main page
            </Link>
        </>
    );
};

export default Page404;