import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './component/Routes/ProtectedRoute';
import PubliRoute from './component/Routes/PubliRoute';
import Donar from './pages/Dashboard/Donar';
import Hospitals from './pages/Dashboard/Hospitals';
import OrganisationPage from './pages/Dashboard/OrganisationPage';
import Consumer from './pages/Dashboard/Consumer';
import Donation from './pages/Donation';
import Analytics from './pages/Dashboard/Analytics';
import DonarList from './pages/Admin/DonarList';
import HospitalList from './pages/Admin/HospitalList';
import OrgList from './pages/Admin/OrgList';
import AdminHome from './pages/Admin/AdminHome';
// import Donar from './pages/Dashboard/Donar';
// import Hospitals from './pages/Dashboard/Hospitals';
// import OrganisationPage from './pages/Dashboard/OrganisationPage';
function App() {
  return (
    <>
    <ToastContainer/>
       <Routes> 
      <Route path='/organisation' element={
          <ProtectedRoute>
           <OrganisationPage/>
          </ProtectedRoute>
          }/>
          <Route path='/admin' element={
          <ProtectedRoute>
           <AdminHome/>
          </ProtectedRoute>
          }/>
          <Route path='/donar-list' element={
          <ProtectedRoute>
           <DonarList/>
          </ProtectedRoute>
          }/>
           <Route path='/hospital-list' element={
          <ProtectedRoute>
           <HospitalList/>
          </ProtectedRoute>
          }/>
           <Route path='/org-list' element={
          <ProtectedRoute>
           <OrgList/>
          </ProtectedRoute>
          }/>
        <Route path='/donar' element={
          <ProtectedRoute>
           <Donar/>
          </ProtectedRoute>
          }/>
          <Route path='/hospital' element={
          <ProtectedRoute>
           <Hospitals/>
          </ProtectedRoute>
          }/> 
          <Route path='/analytics' element={
          <ProtectedRoute>
           <Analytics/>
          </ProtectedRoute>
          }/>
          <Route path='/consumer' element={
          <ProtectedRoute>
           <Consumer/>
          </ProtectedRoute>
          }/> 
           <Route path='/donation' element={
          <ProtectedRoute>
           <Donation/>
          </ProtectedRoute>
          }/> 
          <Route path='/' element={
          <ProtectedRoute>
           <Home/>
          </ProtectedRoute>
          }/>
        <Route path='/login' element={
          <PubliRoute>
            <Login/>
          </PubliRoute>
          }/>
        <Route path='/register' element={
          <PubliRoute>
            <Register/>
          </PubliRoute>
          }/>
      </Routes>
    </>
    
  );
}

export default App;
