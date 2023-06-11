import React, { useState } from 'react';
import { Dropdown, Space, Avatar, Input } from 'antd';
import { DownOutlined, HomeOutlined } from '@ant-design/icons';
import './Layout.scss'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    UsergroupAddOutlined,
    InsertRowAboveOutlined,
    BookOutlined,
    MoneyCollectOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { callLogout } from '../../service/api';
import TableUsers from './TableUsers';
import LayoutBook from './Book';
import LayoutBookAM from './Book';
import AdminOrders from './Orders';
import Dashboard from './Dashboard';
import { doLogoutAction } from '../../redux/account/accountSlice';
const { Header, Sider, Content } = Layout;
const LayoutAdmin = () => {
    const user = useSelector(state => state.account.user);
    const isAuthenticated = useSelector(state => state.account.isAuthenticated)
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const urlAvt = `${import.meta.env.VITE_BASE_URL}/images/avatar/${user.avatar}`;

    const handleLogout = async () => {
        let res = await callLogout();
        if (res?.data) {
            dispatch(doLogoutAction());
            message.success('Đăng xuất thành công')
            navigate('/')
        }

    }
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const items = [

        {
            label: <NavLink className='nav-link' to="/my">Quản lý tài khoản</NavLink>,
            key: '0',
        },
        isAuthenticated === false &&
        {
            label: <NavLink className='nav-link' to='/login'>Đăng nhập</NavLink>,
            key: '1',
        },
        {
            type: 'divider',
        },
        isAuthenticated === true &&
        {
            label: <NavLink className='nav-link' onClick={() => { handleLogout() }} to="/">Đăng Xuất</NavLink>,
            key: '3',
        },
    ];

    return (
        <div className='admin'>
            <div>
                <h3 style={{ paddingLeft: 35, paddingTop: 15 }}>ADMIN  </h3>

                <Layout>
                    <Sider
                        style={{
                            paddingTop: 50,
                            color: '#fff',
                            backgroundColor: 'white',
                        }}
                        width={150}
                        trigger={null}
                        collapsed={collapsed}
                    >
                        <div className="demo-logo-vertical" />
                        <Menu
                            style={{ fontFamily: 'sans-serif', fontSize: 18, width: 250 }}
                            theme="light"
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            items={[
                                {
                                    key: 'Home',
                                    icon: <HomeOutlined />,
                                    label: <NavLink className='nav-link' to='/'>Home</NavLink>,
                                },
                                {
                                    key: 'Dashboard',
                                    icon: <InsertRowAboveOutlined />,
                                    label: <NavLink className='nav-link' to='/admin'>Dashboard</NavLink>,
                                },
                                {
                                    key: '2',
                                    icon: <UserOutlined />,
                                    label: 'Manage Users',
                                    children: [

                                        {
                                            key: 'CRUD',

                                            icon: <UsergroupAddOutlined />,
                                            label: <NavLink className='nav-link' to='/admin/user'>CRUD</NavLink>,
                                        },
                                        {
                                            key: 'Files1',
                                            icon: <UsergroupAddOutlined />,
                                            label: <NavLink className='nav-link' to='/Files1'>Files1</NavLink>,
                                        }
                                    ]
                                },
                                {
                                    key: 'book',
                                    key: 'Manage book',
                                    icon: <BookOutlined />,
                                    label: <NavLink className='nav-link' to='/admin/book'>Manage book</NavLink>,
                                },
                                {
                                    key: 'oders',
                                    key: 'Manage Orders',
                                    icon: <MoneyCollectOutlined />,
                                    label: <NavLink className='nav-link' to='/admin/orders'>Manage Orders</NavLink>,
                                },
                            ]}
                        />
                    </Sider>



                    <Content
                        
                        style={{
                            margin: '24px 160px',
                            minHeight: 'auto',
                            background: colorBgContainer,

                        }}
                    >
                        {window.location.pathname === '/admin/user' &&
                            <TableUsers />}
                        {window.location.pathname === '/admin/book' &&
                            <LayoutBookAM />}
                        {window.location.pathname === '/admin/orders' &&
                            <AdminOrders />}
                                {window.location.pathname === '/admin' &&
                            <Dashboard />}

                    </Content>

                </Layout>
            </div>




            <div className='rightadmin'>

                <Dropdown className='drop' menu={{ items }} trigger={['hover']}>
                    <a onClick={(e) => e.preventDefault()}>
                        <Avatar size={50} src={urlAvt} />
                        <Space

                        >
                            {isAuthenticated === false && 'Tài khoản'}
                            {isAuthenticated === true &&

                                <span>{user.email}</span>
                            }
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
            </div>

        </div>

    )
}
export default LayoutAdmin;