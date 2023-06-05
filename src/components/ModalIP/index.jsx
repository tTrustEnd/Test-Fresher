import React, { useState } from 'react';
import { Button, Modal, notification } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload, Space, Table, Tag } from 'antd';
import * as XLSX from 'xlsx'
import { ImportListUser } from '../../service/api';
import Password from 'antd/es/input/Password';
import Templace from '../User/test1.xlsx?url'
const ModalIP = (props) => {
    const { isShowIP, onClose } = props;
    const [data, setData] = useState([])
    const [current,setCurrent] = useState(1);
    const [pageSize,setPageSize] = useState(10);
   
    const customRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess('ok');
        }, 1000);
    }
    const { Dragger } = Upload;
    const prop = {
        name: 'file',
        multiple: false,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        customRequest: customRequest,
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                const file = info.fileList[0].originFileObj;
                console.log('check file',file)
                let reader = new FileReader();
                // console.log('check reader', reader)
                reader.readAsArrayBuffer(file);
                reader.onload = function (e) {
                    let data = new Uint8Array(e.target.result);
                    let workbook = XLSX.read(data, { type: 'array' });
                    // find the name of your sheet in the workbook first
                    let worksheet = workbook.Sheets['Sheet1'];

                    // convert to json format
                    const jsonData = XLSX.utils.sheet_to_json(worksheet,    {
                        header:['fullName','email','phone'],    
                        range:1
                        
                    });
                    console.log(jsonData)
                    setData(jsonData)
                };
    
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };
    
    const columns = [
        {
            title: 'Tên hiển thị',
            dataIndex: 'fullName',
            key: 'name',
            sorter: true,
            // ellipsis: true,
        },
        {
            title: 'email',
            dataIndex: 'email',
            key: 'age',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'address',

        },
    ];
    const tableOnChange =(pagination,filters,sorter,extra)=>{
      
        console.log(extra)
       if(pagination.current != current){
        setCurrent(pagination.current)
       }
    }
    const onCloseTable = () =>{
        onClose();
        setData('');
    }
    const handleOk = async() => {
       const data1 = data.map(item =>{
        item.password = "123456";
        return item;
       })
     const res = await ImportListUser(data1)
     console.log('chjeck res',res)
       if(res.data){
        notification.success({
            description:`success: ${res.data.countSuccess} error: ${res.data.countError}`
        })
       }
    };
    return (<>

        <Modal width={850} title="Basic Modal" open={isShowIP} onOk={()=>handleOk()} onCancel={onCloseTable}>
            <Dragger {...prop}

            >
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                    banned files. <a onClick={(e) => e.stopPropagation()} href={Templace} download id="download" > Download sample file</a>
                </p>
               
            </Dragger>
            <Table 
            onChange={tableOnChange}
            columns={columns} dataSource={data}
               pagination={{
                showTotal: (total, range) => {
                    return (
                        <div>{range[0] + '-' + range[1] + '-/' + total}</div>
                    );
                },
                current: current,
                pageSize: pageSize,
                showSizeChanger: true,
            }}

            />
        </Modal>

    </>)
}
export default ModalIP;