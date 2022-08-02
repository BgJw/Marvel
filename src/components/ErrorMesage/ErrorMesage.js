import error from './error.gif';

 const ErrorMesage = () => {
     return (
         <img style={{display: 'block', width: '100%', height: '250px', 
                      objectFit: 'contain', margin: '0 auto', backgroundColor: 'white'}} src={error} alt='error'/>
     );
 };
 
 export default ErrorMesage;