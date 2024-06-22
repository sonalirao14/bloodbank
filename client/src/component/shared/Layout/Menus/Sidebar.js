import React from 'react'
// import { userMenu } from './userMenu'
import { useLocation,Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import "../../../../styles/Layout.css"
const Sidebar = () => {
  //GET USER STATE
  const {user}=useSelector(state=>state.auth);
    const location=useLocation();
  
  return (
    <div>
      <div className='sidebar'>
        <div className='menu'>

          {user?.Role==='organisation' &&(
            <>
                <div className={`menu-item ${location.pathname==="/" && 'active'}`} >
                <i className="fa-solid fa-warehouse"></i>
                <Link to="/">Inventory</Link>
            </div>

            <div className={`menu-item ${location.pathname==="/donar" && 'active'}`} >
                <i className="fa-solid fa-hand-holding-droplet"></i>
                <Link to="/donar">Donar</Link>
            </div>

            <div className={`menu-item ${location.pathname==="/hospital" && 'active'}`} >
                <i className="fa-solid fa-hospital-user"></i>
                <Link to="/hospital">Hospital</Link>
            </div>
            </>
          )}
           {user?.Role==='admin' &&(
            <>
                <div className={`menu-item ${location.pathname==="/donar-list" && 'active'}`} >
                <i className="fa-solid fa-warehouse"></i>
                <Link to="/donar-list">Donar List</Link>
            </div>

            <div className={`menu-item ${location.pathname==="/hospital-list" && 'active'}`} >
                <i className="fa-solid fa-hand-holding-droplet"></i>
                <Link to="/hospital-list">Hospital List</Link>
            </div>

            <div className={`menu-item ${location.pathname==="/org-list" && 'active'}`} >
                <i className="fa-solid fa-hospital-user"></i>
                <Link to="/org-list">Organisation List</Link>
            </div>
            </>
          )}
          
            {(user?.Role==="donar" || user?.Role==="hospital") &&(
        <>
         <div className={`menu-item ${location.pathname==="/organisation" && 'active'}`} >
                <i className="fa-solid fa-building-ngo"></i>
                <Link to="/organisation">Organisation</Link>
            </div>
        </>
            )}

{user?.Role==="hospital" &&(
        <>
         <div className={`menu-item ${location.pathname==="/consumer" && 'active'}`} >
                <i className="fa-solid fa-building-ngo"></i>
                <Link to="/consumer">Consumer</Link>
            </div>
        </>
            )}
            {user?.Role==="donar" &&(
        <>
         <div className={`menu-item ${location.pathname==="/donation" && 'active'}`} >
                <i className="fa-solid fa-building-ngo"></i>
                <Link to="/donation">Donation</Link>
            </div>
        </>
            )}
            
           


            {/* {userMenu.map((menu) =>{
          const isActive=location.pathname===menu.path
          return (
            <div className={`menu-item ${isActive && 'active'}`}  key={menu.name}>
                <i className={menu.icon}></i>
                <Link to={menu.path}>{menu.name}</Link>
            </div>
            )
            })} */}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
