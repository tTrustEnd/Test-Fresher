import React, { useEffect, useState } from 'react';
import { Col, Row, Table } from 'antd';
import { getAllOrdesAx } from '../../../service/api';
import { current } from '@reduxjs/toolkit';


const AdminOrders = () => {
    const [dataOrders, setDataOrders] = useState([])
    const [current,setCurrent] = useState(1)
    const [pageSize,setPageSize] = useState(5)
    const [total,setTotal] = useState();
    const columns = [
        {
        
            title: 'id',
            dataIndex: '_id',
        },
        {
            width:500,
            title: 'Tổng tiền',
            dataIndex: 'totalPrice',
            sorter: {
                compare: (a, b) => a.totalPrice - b.totalPrice,
                multiple: 3,
            },

        },
        {
            width:500,
            title: 'Khách hàng',
            dataIndex: 'name',
            editable: true,
   

        },
        {
            width:500,
            title: 'Số điện thoại',
            dataIndex: 'phone',
            editable: true,
   

        },
        {
            width:500,
            title: 'Địa chỉ nhận hàng',
            dataIndex: 'address',
            editable: true,
       
        },
        {
            width:500,
            title: 'Ngày mua',
            dataIndex: 'createdAt',
            sorter: true,
            editable: true,

        },
        
    ];

    const data = dataOrders

    const onChange = (pagination, filters, sorter, extra) => {
        if(pagination !== current){
            setCurrent(pagination.current)
        }
    };
    const getAllOrders = async () => {
        let querry = `current=${current}&pageSize=${pageSize}`
        let res = await getAllOrdesAx(querry);
        setDataOrders(res.data.result)
        setTotal(res.data.meta.total)
    }


    useEffect(() => {
        getAllOrders()
    }, [current])
    return (
        <div style={{width:1600}}>
        <div> <h2> List orders</h2></div>
        <Table
        style={{ paddingRight:400, display: 'flex', justifyContent: 'space-between',textAlign:'center' }}

        columns={columns}
            dataSource={data}
            onChange={onChange}
        pagination={{
            current:current,
            total:total,
            pageSize:pageSize,
            showTotal:(range,total)=>{
                return(
               
                <> {`${total[0]} - ${total[1]} / ${range}`}</>
            )}
        }}
        />
         </div>
    )
}
export default AdminOrders