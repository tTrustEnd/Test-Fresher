import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, message, notification } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { CallUpdate, getAllUsers } from '../../service/api';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const ModalUpDate = (props) => {
    const { dataUpdate, listUSers, onClose, isShowModalUpdate,getUsers } = props;
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        const { _id, fullName, email, phone } = values;
        // console.log('Success:', values);
        let res = await CallUpdate({ _id, fullName, email, phone })
        console.log(res)
        if(res?.data){
            message.success('Cập nhập người dùng thành công');
            await getUsers()
        }   else{
            notification.error({
                description:'Cập nhập người dùng thất bại'
            })
        }

        onClose();
    };


    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    useEffect(() => {
        form.setFieldsValue(dataUpdate);
  
    }, [dataUpdate,onClose])

    return (<>
        <Modal width={600}
            title="Thay đổi thông tin"
            open={isShowModalUpdate}
            onOk={() => { form.submit() }}
            onCancel={onClose}>
            <Form

                form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >

                <Form.Item
                    hidden
                    label="Id"
                    name="_id"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input
                        initialValues={dataUpdate._id}
                    />
                </Form.Item>
                <Form.Item
                    label="Tên hiển thị"
                    name="fullName"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input

                        initialValues={dataUpdate.fullName}
                    />
                </Form.Item>

                <Form.Item

                    label="Email"
                    name="email"
                    rules={[{ required: false, message: 'Please input your password!' }]}
                >
                    <Input
                        disabled
                        initialValues={dataUpdate.email}
                    />
                </Form.Item>
                <Form.Item
                    label="Số điện thoại"
                    name="phone"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input
                        initialValues={dataUpdate.phone}
                    />
                </Form.Item>

            </Form>
        </Modal>
    </>)
}
export default ModalUpDate;