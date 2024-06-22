import React, { useEffect, useState } from 'react'
import Layout from './../../component/shared/Layout/Layout';
import moment from 'moment';
import API from '../../services/API';


const DonarList = () => {

    const [data,setData]=useState([]);
    //Find Donar Records
    const getDonars=async()=>{
     try{
      const {data}= await API.get('/admin/donar-list');
      console.log(data);
      if(data?.success){
         setData(data?.donarData);
      }
     }
     catch(error){
         console.log(error);
     }
    };
    useEffect(()=>{
     getDonars();
    },[])

    const handleDelte=async(id)=>{
     try{
      let answer=window.prompt("Are you sure to delete this donar","sure");
      if(!answer) return
     const {data}=await API.delete(`/admin/delete-donar/${id}`)
     alert(data?.message);
     window.location.reload();
     }
     catch(error){
      console.log(error)
     }
    }
   return (
     <Layout>
       <table className="table">
   <thead>
     <tr>
       <th scope="col">Name</th>
       <th scope="col">Email</th>
       <th scope="col">Mobile No</th>
       <th scope="col">Date</th>
       <th scope="col">Action</th>
     </tr>
   </thead>
   <tbody>
     
     {data?.map((record)=>(
       <tr key={record._id}>
     
     <td>{record?.Name||record?.organisationName +"(ORG)"||record?.hospitalName}</td>
     <td>{record.Email}</td>
     <td>{record.MobileNo}</td>
     <td>{moment(record.createdAt).format('DD/MM/YYYY hh:mm A')}</td>
     <td>
      <button className='btn btn-danger' onClick={()=>handleDelte(record._id)}>
      Delete
      </button>
     </td>
     
   </tr>
     ))}
   </tbody>
 </table>
     </Layout>
  )
}

export default DonarList
