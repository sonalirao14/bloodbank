import React, { useEffect, useState } from 'react'
import Layout from '../../component/shared/Layout/Layout'
import moment from 'moment';
import API from '../../services/API';

const Hospitals = () => {
  const [data,setData]= useState([]);
    // Get Donar Records
    const getHospitals=async()=>{
        try{
            const {data}=await API.get('/inventory/get-hospitals')
            // console.log(data)
            if(data?.success){
              setData(data?.hospitals)
            }
        }
        catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
    getHospitals();
    },[])
  return (
    <Layout>
         <table className="table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">MobileNo</th>
      <th scope="col">Address</th>
      <th scope="col">Date</th>
     
    </tr>
  </thead>
  <tbody>
    
    {data?.map((record)=>(
      <tr key={record._id}>
    
    <td>{record.hospitalName}</td>
    <td>{record.Email}</td>
    <td>{record.MobileNo}</td>
    <td>{record.Address}</td>
    <td>{moment(record.createdAt).format('DD/MM/YYYY')}</td>
    
  </tr>
    ))}
  </tbody>
</table>
</Layout>
  )
}

export default Hospitals
