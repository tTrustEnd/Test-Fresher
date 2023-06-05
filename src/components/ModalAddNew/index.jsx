import React, { useState, useEffect } from 'react';
import { LockOutlined, UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, message, notification, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import './index.scss'
import { callAddNew } from '../../service/api';
const MoadlAddNew = (props) => {
    const [form] = Form.useForm();
    const { isShowAN, onClose, dataUserAN, AddNewUser } = props
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onFinish = async (values) => {
        let { fullName, email, password, phone } = values;
        let res = await callAddNew(fullName, email, password, phone)
        if (res?.data) {
            message.success('Tạo mới user thành công :D')
            form.resetFields();
        } else {
            notification.error({
                message: 'Tạo mới thất bại T_T'
            })
        }
        onClose()

    }
    return (
        <div>

            <Modal open={isShowAN} onCancel={onClose}>

                <div className="register-container">
                    <span className='title'>Đăng ký người dùng mới </span>

                    <div >
                        <Form className="form-register "
                            form={form}
                            name="horizontal_login"
                            layout="inline"
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Form.Item className="input"
                                name="fullName"
                                rules={[{ required: true, message: "Please input your fullname!" }]}
                            >
                                <Input
                                    prefix={<UserOutlined className="site-form-item-icon" />}
                                    placeholder="Fullname"
                                />
                            </Form.Item >
                            <Form.Item className=" input"
                                name="email"
                                rules={[{ required: true, message: "Please input your username!" }]}
                            >
                                <Input
                                    prefix={<MailOutlined className="site-form-item-icon" />}
                                    placeholder="Email"
                                />
                            </Form.Item>
                            <Form.Item className=" input"
                                name="password"
                                rules={[{ required: true, message: "Please input your password!" }]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>
                            <Form.Item className=" input"
                                name="phone"
                                rules={[{ required: true, message: "Please input your phone!" }]}
                            >
                                <Input
                                    prefix={<PhoneOutlined className="site-form-item-icon" />}
                                    placeholder="Phone"
                                />
                            </Form.Item>

                            <Form.Item shouldUpdate>
                                {() => (
                                    <Button
                                        // loading={isLoading}
                                        type="primary"
                                        htmlType="submit"
                                        // disabled={
                                        //     !form.isFieldsTouched(true) ||
                                        //     !!form.getFieldsError().filter(({ errors }) => errors.length)
                                        //         .length
                                        // }
                                        onClick={AddNewUser}
                                    >
                                        Thêm mới
                                    </Button>
                                )}
                            </Form.Item>
                        </Form>
                    </div>

                </div>
            </Modal>
        </div>
    )
}
export default MoadlAddNew;