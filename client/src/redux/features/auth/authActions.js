import {createAsyncThunk} from "@reduxjs/toolkit"
// import { toast } from 'react-toastify';
import API from './../../../services/API';


//For Login
export const userLogin=createAsyncThunk(
    "auth/login",
    async({Role,Email,Password},{rejectWithValue})=>{
        try{
         const {data}=await API.post('/auth/login',{Role,Email,Password})
         //Store TOKEN 
         if(data.success){
            localStorage.setItem("token",data.token)
            alert(data.message)
            window.location.replace('/')
         }
         return data;
        }
        catch(error)
        {
            if(error.response && error.response.data.message){
                return rejectWithValue(error.response.data.message)
            }
            else {
                return rejectWithValue(error.response)
            }
        }
    }
)

// FOR REGISTER
export const userRegister=createAsyncThunk(
    "auth/register",
    async({Role,Email,Password,organisationName,hospitalName,Address,AadharNo,MobileNo,Name},{rejectWithValue})=>{
        try{
       const {data}=await API.post('/auth/register',{Role,Email,Password,organisationName,hospitalName,Address,AadharNo,MobileNo,Name})
        if(data.success){
            // toast.success(data.message);
            alert("User Registered Successfully!")
            window.location.replace('/login')
        }
       
        }
        catch(error){
      console.log(error);
      if(error.response && error.response.data.message){
        return rejectWithValue(error.response.data.message)
    }
    else {
        return rejectWithValue(error.response)
    }
        }
    }
)

//For Current User

export const getcurrentUser=createAsyncThunk(
    "auth/getcurrentUser",
    async({rejectWithValue})=>{
        try{
       const res=await API.get('/auth/current-user')
      if(res?.data){
          return res?.data;
      }
        }
          catch(error){
            console.log(error);
            if(error.response && error.response.data.message){
                return rejectWithValue(error.response.data.message)
            }
            else {
                return rejectWithValue(error.response)
            }
          }
    }
)