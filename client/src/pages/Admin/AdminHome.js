import React from 'react'
import Layout from '../../component/shared/Layout/Layout'
import { useSelector } from 'react-redux'

const AdminHome = () => {
    const {user}=useSelector(state=>state.auth);
  return (
    <Layout>
      <div className='container'>
        <div className='d-flex flex-column mt-4'>
            <h1 > Welcome Admin <i className='text-success bg-light'>{user?.Name}</i></h1>
        <h3> Manage Blood Record </h3>
        <hr/>
        <p>
          loremipsum
        </p>
        </div>

      </div>
    </Layout>
  )
}

export default AdminHome
