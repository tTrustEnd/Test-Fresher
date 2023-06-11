import React, { useEffect, useState } from 'react';
import { Table, Button,  message, notification,Popconfirm } from 'antd';
import './index.scss'
import { CallDelete, getAllUsers } from '../../../service/api';
import ModalDetaiUser from '../ModalDetailUser';
import { CloudDownloadOutlined, DeleteOutlined, EditOutlined, ExportOutlined, ImportOutlined, ReloadOutlined, UserAddOutlined } from '@ant-design/icons';
import MoadlAddNew from '../../ModalAddNew';
import ModalIP from '../../ModalIP';
import * as XLSX from 'xlsx'
import ModalUpDate from '../../ModalUpDate';
import {Input} from 'antd';
const TableUsers = () => {
    const [listUSers, setListUsers] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(4);
    const [total, setTotal] = useState(5);
    const [dataName, setDataName] = useState([]);
    const [dataEmail, setDataEmail] = useState([]);
    const [dataPhone, setDataPhone] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [dataUserDetail, setDataUserDetail] = useState([]);
    const [isShowModalDetailUser, setIsShowModalDetailUser] = useState(false);
    const [dataUserAN, setDataUserAN] = useState([]);
    const [isShowAN, setIsShowAN] = useState(false);
    const [isShowIP, setIsShowIP] = useState(false)
    const [dataUpdate, setDataUpdate] = useState([]);
    const [isShowModalUpdate, setIsShowModalUpdate] = useState(false);
    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
            width: 250,
            render: (text, record, index) => {
                // console.log('cehck text', text);
                // console.log('cehck record', record);
                // // console.log('cehck index', index);
                return (
                    <a
                        onClick={() => {
                            setDataUserDetail(record);
                            setIsShowModalDetailUser(true);
                        }}
                        href='#'>{record._id}</a>
                )
            }
        },
        {
            title: 'Tên hiển thị',
            className: 'name',
            dataIndex: 'fullName',
            ellipsis: true,
            width: 300,
            sorter: true,
            editable: true,

        },
        {
            key: 'CRUD',
            title: 'Email',
            dataIndex: 'email',
            ellipsis: true,
            width: 300,
            sorter: true,
        },
        {

            title: 'Số điện thoại',
            dataIndex: 'phone',
            ellipsis: true,
            width: 300,
            delete: true
        },
        {
            key: 'delete',
            title: 'Action',
            render: (text, record, index) => {
                // console.log('cehck text', text);
                // console.log('cehck record', record);
                // console.log('cehck index', index);
                return (
               
                    <div>
                             {text.role !== 'ADMIN' &&
                        <Popconfirm 
                          onConfirm={()=> handleDelete(text)}
                        placement="left" title='Xóa người dùng này???'
                         content={
                        <div >
                           <button
                            >Ok</button>
                           <button>Cancel</button>
                        </div>
                    } trigger="click">
                             <DeleteOutlined style={{ color: '#08c' }} />
                        </Popconfirm>
            }
                        <EditOutlined style={{ color: '#b85ad1' }} onClick={() => {
                            setIsShowModalUpdate(true)
                            setDataUpdate(text)
                        }} />
                    </div>

                )
            }
            ,
            ellipsis: true,
            width: 100
        },

    ];

    const handleDelete = async(text) => {
       let id = text._id;
       let res = await CallDelete(id)
       console.log('check res',res)
      if(res?.data){
        message.success('Xóa người dùng thành công');
        await getUsers()
      }
        else{
           notification.error({
            title:"có lỗi xảy ra",
            description:`${res.message}`
           })
        }
    }

    const getUsers = async () => {
        let query = `current=${current}&pageSize=${pageSize}`
        let res = await getAllUsers(query);
        // console.log('check res',res)
        if (res?.data) {
            setListUsers(res.data.result);
            setTotal(res.data.meta.total);
        }
    }
    useEffect(() => {
        getUsers();

    }, [current, pageSize, dataUpdate.name])

    const onChange = async (pagination, filters, sorter, extra) => {
        setisLoading(true)
        let query = `current=${current}&pageSize=${pageSize}`;
        if (pagination.current !== current) {
            setCurrent(pagination.current)

        }
        if (pagination.pageSize) {
            setPageSize(pagination.pageSize);
        }
        if (sorter.order === 'ascend') {
            console.log('check sorter', sorter)
            let query = `current=${current}&pageSize=${pageSize}&sort=${sorter.field}`
            let res = await getAllUsers(query);
            if (res) {
                setListUsers(res.data.result)
            }
        } if (sorter?.field && sorter.order === 'descend') {
            console.log('check sorter', sorter)
            let query = `current=${current}&pageSize=${pageSize}&sort=-${sorter.field}`
            let res = await getAllUsers(query);
            if (res) {
                setListUsers(res.data.result)
            }
        }
        setisLoading(false)
    }
    const handleSearch = async (e) => {
       if(e.keyCode===13){
        if (dataName) {
            let query = `current=${current}&pageSize=${pageSize}&fullName=/${dataName}/i`
            let res = await getAllUsers(query);
            if (res?.data?.result) {
                setListUsers(res.data.result)
            }
        }
        if (dataEmail) {
            let query = `current=${current}&pageSize=${pageSize}&email=/${dataEmail}/i`
            let res = await getAllUsers(query);
            if (res?.data?.result) {
                setListUsers(res.data.result)
            }
        }
        if (dataPhone) {
            let query = `current=${current}&pageSize=${pageSize}&phone=/${dataPhone}/i`
            let res = await getAllUsers(query);
            if (res?.data?.result) {
                setListUsers(res.data.result)
            }
        }
        if (dataName && dataEmail) {
            let query = `current=${current}&pageSize=${pageSize}&fullName=/${dataName}/i&email=/${dataEmail}/i`
            let res = await getAllUsers(query);
            if (res?.data?.result) {
                setListUsers(res.data.result)
            }
        }

       }
            else{
                getUsers()
            }
    }
    const onClose = () => {
        setIsShowModalDetailUser(false);
        setIsShowAN(false);
        setIsShowIP(false);
        setIsShowModalUpdate(false);
    }
    const AddNewUser = async () => {
        //     console.log(dataUserAN)
        //    let res = await callAddNew(dataUserAN);
        //    console.log(res)
    }
    const downLoadCSV = (listUSers) => {
        console.log(listUSers)
        const worksheet = XLSX.utils.json_to_sheet(listUSers);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
        //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
        XLSX.writeFile(workbook, "User.xlsx");
    }

    const love = () => {
        return (<>
            <div className='love' style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h2>Table Users</h2>
                <span style={{ display: 'flex', gap: 5,alignItems:'center' }}>
                    <Button
                        onClick={() => downLoadCSV(listUSers)}
                        icon={<CloudDownloadOutlined 
                            style={{ fontSize:22, marginRight:0 }} 
                        />}
                        type='primary'
                    > Export </Button>
                    <Button
                
                        icon={<ExportOutlined
                            style={{ fontSize:22}} 
                            />}
                        type='primary'
                        onClick={() => { setIsShowIP(true) }}
                    >Import</Button>
                    <Button
                    type='primary'
                        icon={<UserAddOutlined 
                            style={{ fontSize:22}} 
                        />}
                        onClick={
                            () => { setIsShowAN(true) }
                        }
                    >Thêm mới</Button>
                    <Button
                        icon={<ReloadOutlined />}
                        onClick={() => {
                            
                        }}
                    ></Button>


                </span>
            </div>

        </>)
    }
    return (
        <>
            <ModalDetaiUser
                isShowModalDetailUser={isShowModalDetailUser}
                dataUserDetail={dataUserDetail}
                onClose={onClose}
            />

            <div className='input-g'>
                <div className='input1'><span>Name </span>
                    <Input
                      onKeyDown={(e) => handleSearch(e)}
                    style={{ width: 250 }}
                    size='large'
                        value={dataName}
                        onChange={(event) => setDataName(event.target.value)}
                        type="text" placeholder='Tìm kiếm người dùng'
                    /></div>
                <div className='input2'> <span> Email  </span>
                    <Input
                      onKeyDown={(e) => handleSearch(e)}
                     style={{ width: 250 }}
                        value={dataEmail}
                        onChange={(event) => setDataEmail(event.target.value)}
                        type="text" placeholder='Tìm kiếm người dùng' />
                </div>
                <div className='input3'><span>PhoneNunmber</span>
                    <Input
                    onKeyDown={(e) => handleSearch(e)}
                     style={{ width: 250 }}
                        value={dataPhone}
                        onChange={(event) => setDataPhone(event.target.value)}
                        type="text" placeholder='Tìm kiếm người dùng' />
                </div>
                {/* <button
                    onClick={() => handleSearch()}
                    className='btn btn-primary'> Search</button> */}

            </div>


            <Table
                title={love}
                loading={isLoading}
                className='def'
                columns={columns}
                dataSource={listUSers}
                onChange={onChange}
                pagination={{
                    showTotal: (total, range) => {
                        return (
                            <div>{range[0] + '-' + range[1] + '-/' + total}</div>
                        );
                    },
                    current: current,
                    total: total,
                    pageSize: pageSize,
                    showSizeChanger: true,
                }}
            />



            <MoadlAddNew
                dataUserAN={dataUserAN}
                isShowAN={isShowAN}
                onClose={onClose}
                AddNewUser={AddNewUser}
            />
            <ModalIP
                isShowIP={isShowIP}
                onClose={onClose}
            />
            <ModalUpDate
                dataUpdate={dataUpdate}
                isShowModalUpdate={isShowModalUpdate}
                listUSers={listUSers}
                onClose={onClose}
                getUsers={getUsers}
            />
        </>



    )
}
export default TableUsers;