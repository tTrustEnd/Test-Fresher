import React, { useEffect, useState } from "react";
import { fetchUserRegister } from "../../service/api";
import { LockOutlined, UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, message, notification } from "antd";
import './register.scss'
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm();
    const [, forceUpdate] = useState({});
    const [isLoading, setIsLoading] = useState(false)
    // To disable submit button at the beginning.
    useEffect(() => {
        forceUpdate({});
    }, []);

    const onFinish = async (values) => {
        // const message =useMessage();
        setIsLoading(true);
        console.log("Check data create:", values);
        const { fullName, email, password, phone } = values
        let res = await fetchUserRegister(fullName, email, password, phone)
        console.log(res)
        setIsLoading(false)
        if (res?.data?._id) {
            message.success(
                'Đăng ký người dùng thành công'
            )
            navigate('/login')
        }
        if (res?.error) {
            notification.error(
                {
                    message: 'có lỗi xảy ra',
                    description: message && res.message.length > 0 ? res.message : '',
                    duration: 1
                }
            )
        }

    };
    return (

        <div className="register-container">
            <span>Đăng ký người dùng mới </span>

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
                                loading={isLoading}
                                type="primary"
                                htmlType="submit"
                            // disabled={
                            //     !form.isFieldsTouched(true) ||
                            //     !!form.getFieldsError().filter(({ errors }) => errors.length)
                            //         .length
                            // }
                            >
                                Đăng ký
                            </Button>
                        )}
                    </Form.Item>
                </Form>
            </div>

        </div>
    )
}
export default Register;