import React, { useState, useEffect } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import { Select } from 'antd'
import moment from 'moment'
import { useAuth } from '../../context/auth';
import axios from 'axios'
const { Option } = Select;







const AdminOrders = () => {


    const [status, setStatus] = useState(["Not Processed", "Processing", "Shipped", "Delivered", "Canceled"])

    const [changeStatus, setChangeStatus] = ('')
    const [auth, setAuth] = useAuth();
    const [orders, setOrders] = useState([]);

    const getOrders = async () => {
        try {
            const { data } = await axios.get("/api/v1/auth/all-orders");
            setOrders(data)

        } catch (error) {
            console.log(error)
        }
    };


    useEffect(() => {
        if (auth?.token) getOrders()
    }, [auth?.token])


    const handleStatusUpdate = async (orderId, value) => {
        try {
            const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, { status: value })
            getOrders();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Layout title={"All Orders"}>
            <div className='row'>
                <div className='col-md-3'>
                    <AdminMenu />
                </div>
            </div>
            <div className='col-md-9'>
                <h1 className='text-center'>All Orders</h1>
                {
                    orders?.products?.map((order, i) => {
                        return (
                            <div className='border shadow'>
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Buyer</th>
                                            <th scope="col">Ordered</th>
                                            <th scope="col">Payment</th>
                                            <th scope="col">Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{i + 1}</td>
                                            <td>
                                                <Select
                                                    bordered={false}
                                                    onChange={(value) => handleStatusUpdate(order._id, value)}
                                                    defaultValue={order?.status}
                                                >
                                                    {status.map((statusIs, i) => (
                                                        <Option key={i} value={statusIs}>{statusIs}</Option>
                                                    ))}
                                                </Select>
                                            </td>
                                            <td>{order?.buyer.name}</td>
                                            <td>{moment(order?.createdAt).fromNow()}</td>
                                            <td>{order?.payment.success ? "Successful" : "Failed"}</td>
                                            <td>{order?.products?.length}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className='container'>
                                    {order?.products?.map((p, i) => (
                                        <div className='row mb-2 card flex-row p-3' key={p._id}>
                                            <div className='col-md-4'>
                                                <img src={`/api/v1/product/product-photo/${p._id}`}
                                                    className="card-img-top"
                                                    alt={p.name}
                                                    width='100px'
                                                    height={'100px'}
                                                />
                                            </div>
                                            <div className='col-md-8'>
                                                <h5 style={{ fontWeight: 700 }} >{p.name}</h5>
                                                <p>{p.description.substring(0, 30)}...</p>
                                                <p>$ {p.price}</p>

                                            </div>
                                        </div>

                                    ))}

                                </div>


                            </div>
                        );
                    })
                }
            </div>
        </Layout>
    )
}


export default AdminOrders;