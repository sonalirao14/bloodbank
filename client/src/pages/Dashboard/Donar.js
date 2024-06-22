import React,{useState,useEffect} from 'react'
import Layout from './../../component/shared/Layout/Layout';
import API from '../../services/API';
import moment from 'moment';

const Donar = () => {
   const [data,setData]=useState([]);
   //Find Donar Records
   const getDonars=async()=>{
    try{
     const {data}= await API.get('/inventory/get-donars');
     console.log(data);
     if(data?.success){
        setData(data?.donars);
     }
    }
    catch(error){
        console.log(error);
    }
   };
   useEffect(()=>{
    getDonars();
   },[])
  return (
    <Layout>
      <table className="table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Mobile No</th>
      <th scope="col">Date</th>
    </tr>
  </thead>
  <tbody>
    
    {data?.map((record)=>(
      <tr key={record._id}>
    
    <td>{record?.Name||record?.organisationName +"(ORG)"||record?.hospitalName}</td>
    <td>{record.Email}</td>
    <td>{record.MobileNo}</td>
    <td>{moment(record.createdAt).format('DD/MM/YYYY')}</td>
    
  </tr>
    ))}
  </tbody>
</table>
    </Layout>
  )
}

export default Donar
