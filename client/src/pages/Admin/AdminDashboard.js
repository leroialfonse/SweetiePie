import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu';
import { useAuth } from '../../context/auth';




const AdminDashboard = () => {

    // using the custom auth Hook to get auth obj
    const [auth] = useAuth()

    return (
        <Layout>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                        <div className='col-lg'>
                            <div className='card w-75 p-3'>
                                <h2>Administrator Profile: </h2>
                                <h5>Name: {auth?.user?.name}</h5>
                                <h5>Email: {auth?.user?.email}</h5>
                                <h5>Phone: {auth?.user?.phone}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>

    )
}

export default AdminDashboard;