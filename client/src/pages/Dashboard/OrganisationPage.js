import React, { useEffect, useState } from 'react'
import Layout from '../../component/shared/Layout/Layout'
import { useSelector } from 'react-redux';
import API from '../../services/API';
import moment from 'moment';

const OrganisationPage = () => {
  const {user}=useSelector(state=>state.auth)
    const [data,setData]= useState([]);
    // Get ORG Records
    const getORG=async()=>{
        try{
          if(user?.Role==='donar'){
            const {data}=await API.get('/inventory/get-organisation-for-hospital')
            // console.log(data)
            if(data?.success){
              setData(data?.organisations)
            }
          }
          if(user?.Role==='hospital'){
            const {data}=await API.get('/inventory/get-organisation-for-hospital')
            // console.log(data)
            if(data?.success){
              setData(data?.organisations)
            }
          }
        }
        catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
    getORG();
    },[user])
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
    
    <td>{record.organisationName}</td>
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

export default OrganisationPage
