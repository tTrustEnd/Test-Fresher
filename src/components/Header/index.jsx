import React, { useEffect, useState } from 'react';
import { FaReact } from 'react-icons/fa';
import { PlusOutlined, SearchOutlined, ShoppingCartOutlined, ShoppingFilled, ShoppingTwoTone } from '@ant-design/icons';
import { DownOutlined } from '@ant-design/icons';
// import type { MenuProps } from 'antd';
import { Badge, Dropdown, Space, Avatar, Input, message, Popover, InputNumber, Button, Row, Col, Modal, Tabs, Form, Upload, notification } from 'antd';
import './index.scss'
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate, useOutletContext } from 'react-router-dom';
import { CallUpdate, callChangePassword, callLogout, callUploadBookImg, getAllUsers } from '../../service/api';
import { doUpdateDetail, doUploadAvtAc, doViewPreUpload, doLogoutAction } from '../../redux/account/accountSlice';
import { doSearchItem } from '../../redux/order/orderSlice';



const Header = () => {
    const [form] = Form.useForm()
    const avataTemplace = useSelector(state => state.account.avataTemplace)
    const carts = useSelector(state => state.order.carts)
    // const orderCount = useSelector(state => state.order.carts)
    const navigate = useNavigate();
    const user = useSelector(state => state.account.user);
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [valuesView, setValuesView] = useState('')
    const dispatch = useDispatch();
    const [avt, setAvt] = useState('');
    const handleLogout = async () => {
        let res = await callLogout();
        if (res?.data) {
            dispatch(doLogoutAction());
            localStorage.removeItem('persist:root')
            message.success('Đăng xuất thành công')
            navigate('/')
        }
    }
    const handleSearch = (e) => {
        let res = e.target.value
        dispatch(doSearchItem(res))
    }
    const handleShow = () => {
        setIsModalOpen(true);
        if (valuesView) {
            form.setFieldsValue({ fullName: valuesView.fullName, email: user.email, phone: valuesView.phone })
        }
        if (user) {
            form.setFieldsValue({ fullName: user.fullName, email: user.email, phone: user.phone })
        }

    }
    const urlAvt = `${import.meta.env.VITE_BASE_URL}/images/avatar/${user.avatar}`;

    const items = [
        isAuthenticated === true &&
        {
            label: <span onClick={() => handleShow()}> Quản lý tài khoản </span>,
            key: 'my',
        },
        user.role === 'ADMIN' &&
        {
            label: <NavLink className='nav-link' to='/admin'>Admin</NavLink>,
            key: 'admin',
        },
        isAuthenticated === false &&

        {
            label: <NavLink className='nav-link' to='/login'>Đăng nhập</NavLink>,
            key: 'login',
        },
        {
            type: 'divider',
        },
        isAuthenticated === true &&
        {
            label: <NavLink className='nav-link' onClick={() => handleLogout()} to="#">Đăng Xuất</NavLink>,
            key: '3',
        },
    ];

    const handleCancel = () => {

        setIsModalOpen(false)
        // form.setFieldsValue({ fullName: valuesView.fullName, email: user.email, phone: valuesView.phone,avatar:user.avatar })
    }
    const onChange = (key) => {
        console.log(key);
    };
    const handleUpLoadAVT = async ({ file, onSuccess, onError }) => {
        console.log('check file', file)
        const res = await callUploadBookImg(file)
        const newAvatar = res.data.fileUploaded;
        console.log('newa', newAvatar)
        console.log('checl res avr', res)
        dispatch(doViewPreUpload({ avatar: newAvatar }))
        setAvt(newAvatar)
        console.log('check k AVT', avt)
        // dispatch(doViewPreUpload({ avatar: avt }))

    }
    const onFinish = async (values) => {
        console.log(values)
        setValuesView(values)
        if (values) {
            let email = values.email;
            const oldpass = values.password;
            const newpass = values.newPassword;
            console.log(email, oldpass, newpass)
            if (oldpass && newpass && oldpass.length > 0 && newpass.length > 0) {
                let res1 = await callChangePassword(email, oldpass, newpass)
                console.log(res1)
                if (res1.statusCode === 200) {
                    message.success('Thay đổi mật khẩu thành công')
                }
                notification.error({
                    message: 'Thay đổi mật khẩu thất bại',
                    description: res1.message
                })
            }
            let res = await CallUpdate({ _id: user.id, phone: values.phone, fullName: values.fullName, avatar: avt })
            console.log('check res', res)
            dispatch(doUpdateDetail(values))
            dispatch(doUploadAvtAc({ avatar: avt }))
            setIsModalOpen(false)
            form.setFieldsValue({ password: '', newPassword: '' })
        }


    }
    const onFinishFailed = () => {

    }

    const handleChange = (info) => {
        console.log(info)
    }
    const fileList = []
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const urlAvt1 = `${import.meta.env.VITE_BASE_URL}/images/book/${user.avatar}`
    const urlPR = `${import.meta.env.VITE_BASE_URL}/images/book/${avataTemplace || user.avatar}`
    useEffect(() => {

    }, [])
    const item = [
        {
            key: '1',
            label: `Cập nhật thông tin`,
            children: <div style={{ display: 'flex' }}>
                <div>
                    <div>
                        <Avatar
                            style={{ height: 200, width: 200 }}
                            src={urlPR}
                        />
                    </div>
                    <div style={{ paddingLeft: 50 }}>
                        <Upload
                            customRequest={handleUpLoadAVT}
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture-circle"
                            fileList={fileList}
                            onChange={handleChange}
                        >
                            {fileList.length >= 8 ? null : uploadButton}
                        </Upload>
                    </div>

                </div>
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
                        label="Tên hiển thị"
                        name="fullName"
                    >
                        <Input
                            value={user.fullName}
                            initialValues={user.fullName}
                        />
                    </Form.Item>

                    <Form.Item

                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input
                            disabled
                            initialValues={user.email}
                        />
                    </Form.Item>
                    <Form.Item
                        defaultActiveKey='s'
                        label="Số điện thoại"
                        name="phone"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input
                            initialValues={user.phone}
                        />
                    </Form.Item>

                </Form>
                <div>

                </div>
            </div>,
        },
        {
            key: '2',
            label: `Thay đổi mật khẩu`,
            children: <>
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
                        label="Mật khẩu cũ"
                        name="password"
                    >
                        <Input.Password

                        />
                    </Form.Item>

                    <Form.Item

                        label="Mật khẩu mới"
                        name="newPassword"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password

                        />
                    </Form.Item>


                </Form>
            </>,
        },
    ];
    return (
        <Row gutter={[20, 20]} className='header-container' >

            <Col className='left-header' xxl={16} xl={16} lg={16} md={13} sm={16} >
                <div><FaReact onClick={() => {
                    navigate('/')
                }} style={{ paddingTop: '14', fontSize: '50px' }} className='iconreact' /> </div>

                <div>  <span onClick={() => {
                    navigate('/')
                }} className='titleheader'>MẹCủaBạnn</span> </div>
                <div style={{ display: 'flex', paddingTop: 11, width: '100%' }}>
                    <div>  <SearchOutlined /> </div>
                    <div style={{ width: 600 }}> <Input
                        onChange={(e) => handleSearch(e)}
                        placeholder='Tìm gì hôm nay nào' /></div>
                </div>


            </Col>
            <Col xxl={2} xl={4} lg={6} md={3}  >
            </Col>
            <Col xxl={4} xl={4} lg={2} md={7} style={{ display: 'flex', justifyContent: 'right' }} >
                <div className='right-header'>

                    <div style={{ paddingRight: 60, paddingTop: 4 }}>
                        <Popover
                            trigger="hover"
                            placement="bottomLeft"

                            content={(
                                <>
                                    {carts && carts.length > 0 && carts.map((item, index) => {

                                        return (
                                            <div
                                                style={{ display: 'flex', height: 50 }}
                                                key={`product - ${index}`}>
                                                <div>  <Avatar
                                                    src={`${import.meta.env.VITE_BASE_URL}/images/book/${item.detail.thumbnail}`}
                                                /> </div>
                                                <div> {item.detail.mainText}</div>
                                                <div style={{ color: 'red', paddingLeft: 6 }}>
                                                    {item.detail.price} vnđ
                                                </div>
                                            </div>
                                        )
                                    })}
                                    {carts && carts.length > 0 &&
                                        <div style={{ display: 'flex', justifyContent: 'right' }}>
                                            <Button onClick={() => { navigate('/order') }} style={{ color: 'white', background: 'red', }}>Xem giỏ hàng</Button>
                                        </div>
                                    }
                                </>
                            )}
                        >

                            <Badge
                                count={<div
                                    style={{ background: 'red', width: 15, color: 'white', borderRadius: '100%', textAlign: 'center' }}>
                                    {carts.length ? carts.length : 0}
                                </div>}>
                                <NavLink to='order'>
                                    <ShoppingCartOutlined
                                        style={{ fontSize: 30, color: 'aqua' }} />
                                </NavLink>
                            </Badge>
                        </Popover>


                    </div>

                    <div>

                        <Dropdown
                            menu={{ items }} trigger={['click']}>
                            <a onClick={(e) => e.preventDefault()}>
                                <Avatar src={urlAvt1} />
                                <Space>
                                    {isAuthenticated === false && 'Tài khoản'}

                                    {isAuthenticated === true && user.email && <span> {user.fullName} </span>}
                                    <DownOutlined />
                                </Space>
                            </a>
                        </Dropdown>
                    </div>


                </div>
            </Col>
            <Col>
                <Modal width={800} title="Thông tin người dùng" open={isModalOpen} onOk={() => form.submit()} onCancel={handleCancel}>

                    <Tabs defaultActiveKey="1" items={item} onChange={onChange} />


                </Modal>
            </Col>

        </Row>


    )
}
export default Header;