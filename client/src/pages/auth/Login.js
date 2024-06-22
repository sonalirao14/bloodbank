import React from "react";
import Form from "../../component/shared/form/Form";
import { useSelector } from "react-redux";
import Spinner from "./../../component/shared/Spinner";

const Login = () => {
  const {error,loading}= useSelector((state) => state.auth ||{});
  return (
     <>
     {error && <span>{alert(error)}</span>}
    {loading? (<Spinner/>):( <div className="row">
      <div className="col-md-8 form-banner">
        <img src="./assets/images/banner1.jpg" alt='Login'/>
      </div>
      <div className="col-md-4 form-container">
      <Form  formTitle={'Login Page'} SubmitBtn={'Login'} formType={'login'}/>
   
       
      </div>
     </div>
    )}
    
  </>
  )
}

export default Login
