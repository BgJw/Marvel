import ErrorMesage from "../components/ErrorMesage/ErrorMesage";
import Spinner from "../components/Spinner/Spinner"


const setContent = (Component, props, status, newItemsLoading = null) => {
    switch (status) {
        case 'idle':
            return <Component props={props} /> 
        case 'loading':
            return newItemsLoading? <Component props={props} />: <Spinner />
        case 'initial':
            return <Spinner />
        case 'error':
            return <ErrorMesage />
        default:
            return null
    }
}

export default setContent;