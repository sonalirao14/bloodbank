import React,{useState} from 'react'
import InputType from './InputType'
import {Link} from 'react-router-dom'
import { handleLogin, handleRegister } from '../../../services/authService';
const Form = ({formType,SubmitBtn,formTitle}) => {
  const [email,setemail]=useState("");
  const [name,setName]=useState("");
  const [password,setPassword]=useState("");
  const [organisationName,setorganisationName]=useState(" ");
  const [Role,setRole]=useState("");
  const [hospitalName,sethospitalName]=useState(" ");
  const [aadharNo,setAadharNo]=useState(" ");
  const [address,setAddress]=useState(" ");
  const [mobileNo,setMobileNo]=useState(" ");
  return (
    <div>
      <form onSubmit={(e)=>{
        if(formType==='login') return handleLogin(e,email,password,Role)
          else if(formType==='register') return handleRegister(e,Role,email,password,organisationName,hospitalName,address,aadharNo,mobileNo,name)

      }}>
        <h1 className='text-center'>{formTitle}</h1>
        <hr/>
         <div className='d-flex mb-3'>
          <div className='form-check'>
            <input type='radio' className='form-check-input' id='donarRadio' name='Role' value={"donar"} onChange={(e)=>setRole(e.target.value)}/>
             <label htmlFor='donarRadio' className='form-check-label'>
              Donar
             </label>
          </div>

        

    
          <div className='form-check ms-2'>
            <input type='radio' className='form-check-input' id='AdminRadio' name='Role' value={"admin"} onChange={(e)=>setRole(e.target.value)}/>
             <label htmlFor='AdminRadio' className='form-check-label'>
              Admin 
             </label>
          </div>

          <div className='form-check ms-2'>
            <input type='radio' className='form-check-input' id='organisationRadio' name='Role' value={"organisation"} onChange={(e)=>setRole(e.target.value)}/>
             <label htmlFor='organisationRadio' className='form-check-label'>
              Organisation
             </label>
          </div>


          <div className='form-check ms-2'>
            <input type='radio' className='form-check-input' id='hospitalRadio' name='Role' value={'hospital'} onChange={(e)=>setRole(e.target.value)}/>
             <label htmlFor='hospitalRadio' className='form-check-label'>
              Hospital
             </label>
          </div>

        </div>
        { /* //Switch statement */ }
        
          {(()=>{
            //eslint-disable-next-line
            switch(true){
          case formType==='login':{
              return (
                <>
                <InputType labelText={'Email'} labelFor={'forEmail'} inputType={'email'} 
        name={'email'}
        value={email}
        onChange={(e)=>setemail(e.target.value)}
        
        />
         <InputType labelText={'Password'} labelFor={'forPassword'} inputType={'password'} 
        name={'password'}
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        
        />
                </>
              )
          }
          case formType==='register':{
            return (
            <>
            
         {Role === "admin" &&(
                    <InputType
                      labelText={"Name"}
                      labelFor={"forName"}
                      inputType={"name"}
                      name={"name"}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  )}
                  {Role==="donar" &&(
                    <InputType
                    labelText={"Name"}
                    labelFor={"forName"}
                    inputType={"name"}
                    name={"name"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  )}
          {Role==='organisation' &&(
             <InputType labelText={'organisationName'} labelFor={'fororganisationName'} inputType={'organisationName'} 
             name={'organisationName'}
             value={organisationName}
             onChange={(e)=>setorganisationName(e.target.value)}
             
             />
        )}
        {Role==='hospital' &&(
          <InputType labelText={'hospitalName'} labelFor={'forhospitalName'} inputType={'hospitalName'} 
        name={'hospitalName'}
        value={hospitalName}
        onChange={(e)=>sethospitalName(e.target.value)}
        
        />
        )}
          <InputType labelText={'Email'} labelFor={'forEmail'} inputType={'email'} 
        name={'email'}
        value={email}
        onChange={(e)=>setemail(e.target.value)}
        
        />
        
         <InputType labelText={'Password'} labelFor={'forPassword'} inputType={'password'} 
        name={'password'}
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        
        />
       
        <InputType labelText={'AadharNo'} labelFor={'forAadharNo'} inputType={'aadharNo'} 
        name={'aadharNo'}
        value={aadharNo}
        onChange={(e)=>setAadharNo(e.target.value)}
        
        />
        
        
           <InputType labelText={'Address'} labelFor={'forAddress'} inputType={'Address'} 
        name={'Address'}
        value={address}
        onChange={(e)=>setAddress(e.target.value)}
        
        />
        <InputType labelText={'MobileNo'} labelFor={'forMobileNo'} inputType={'MobileNo'} 
        name={'MobileNo'}
        value={mobileNo}
        onChange={(e)=>setMobileNo(e.target.value)}
            
        />

            
            </>
            )
          }
            }
          })()}

          <div className='d-flex flex-row justify-content-between'>
          {formType==='login'?(
            <p>Not Registered yet? Register 
              <Link to="/register"> Here!</Link>
            </p>
          ):(
         <p>Already User? Login 
          <Link to="/login"> Here!</Link>
         </p>
          )}
            <button className='btn btn-primary' type='submit'>
              {SubmitBtn}
            </button>

          </div>
      </form>
    </div>
  )
}

export default Form
