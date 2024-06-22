import { userLogin, userRegister } from "../redux/features/auth/authActions";
import store from "../redux/store";


export const handleLogin=(e,Email,Password,Role)=>{
    e.preventDefault()
    try{
        if(!Role || !Email || !Password){
            return alert("Please provide all necessary details")
        }
        store.dispatch(userLogin({e,Email,Password,Role}));

    }
    catch(error){
        console.log(error);
    }
};

export const handleRegister=(e,Role,Email,Password,organisationName,hospitalName,Address,AadharNo,MobileNo,Name)=>{
    e.preventDefault()
    try{
     store.dispatch(userRegister({e,Role,Email,Password,organisationName,hospitalName,Address,AadharNo,MobileNo,Name}))
    }
    catch(error){
        console.log(error)
    }
}