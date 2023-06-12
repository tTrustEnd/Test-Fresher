import React, { useEffect, useState } from "react";
import { fetchLogin } from "../../service/api";
import { LockOutlined, UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { Button, Descriptions, Divider, Form, Input, message, notification } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import Password from "antd/es/input/Password";
import { useDispatch } from "react-redux";
import { doLoginAction } from "../../redux/account/accountSlice";

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [, forceUpdate] = useState({});
    const [isLoading, setIsLoading] = useState(false)
    // To disable submit button at the beginning.
    useEffect(() => {

    }, []);
 

    const onFinish = async(values) => {
        const {username, password } = values;
        let res = await fetchLogin(username, password)
   if(res?.data?.access_token){
    console.log(res)
    localStorage.setItem('access_token',res.data.access_token)
    dispatch(doLoginAction(res.data.user))
   message.success('Đăng nhập tài khoản thành công')
    navigate('/')
  
   }
   if(res?.error){
    notification.error({
        message:'Đăng nhập không thành công',
        description:res && res.message && res.message.length > 0 ? res.message : res.message[0],
        duration:1
    })
   }
    };
    return (

        <div className="register-container">
            <span>Đăng nhập</span>

            <div >
                <Form className="form-register "
                    form={form}
                    name="horizontal_login"
                    layout="inline"
                    onFinish={onFinish}
                    autoComplete="off"
                >
                
                    <Form.Item className=" input"
                        name="username"
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
                              Đăng nhập
                            </Button>
                        )}
                    </Form.Item>
                </Form>
            </div>
           <span className="span1" >Chưa có tài khoản?<NavLink className="link" to='/register' > Đăng ký</NavLink></span> 
        </div>
    )
}
export default LoginPage;