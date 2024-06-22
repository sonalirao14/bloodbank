import React from "react";
import { BiDonateBlood, BiUserCircle } from "react-icons/bi";
import {useSelector}  from "react-redux";
import { useNavigate,useLocation,Link } from "react-router-dom";
const Header = () => {
  const {user}= useSelector((state) => state.auth);
  const navigate=useNavigate();
  const location=useLocation();
  const handleLogout=()=>{
    localStorage.clear();
    navigate('/login');
    alert("Logout Sucessfully");
  }
  return (
    <>
        <nav className='navbar'>
          <div className='container-fluid'>
            <div className='navbar-brand'><BiDonateBlood color='red'/> HemoLink System</div>
            <ul className='navbar-nav flex-row'>
              <li className='nav-item mx-3'>
                <p className='nav-link'><BiUserCircle color='white'/> Welcome{" "} 
                {user?.Name || user?.organisationName} {user?.hospitalName } 
                &nbsp;
                <span className="badge text-bg-secondary">{user?.Role}</span>
                
                </p>
               </li>
               {
                (location.pathname==="/" || location.pathname==="/donar" || location.pathname==="/hospital") ?(
                  <li className='nav-item mx-3'>
                <Link to="/analytics" className='nav-link'>
                Analytics
                
                </Link>
               </li>
                ):(
                  <li className='nav-item mx-3'>
                  <Link to="/" className='nav-link'>
                  Home
                  
                  </Link>
                 </li>
                )
               }
               <li className='nav-item mx-3'>
                <button className='btn btn-danger' onClick={handleLogout}>LogOut</button>
               </li>
              </ul>
        
          </div>
        </nav>
    </>
  )
}

export default Header
