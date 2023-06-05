import React, { useState } from 'react';
import { Dropdown, Space, Avatar, Input } from 'antd';
import { DownOutlined } from '@ant-design/icons';
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
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { callLogout } from '../../service/api';
import { doLogoutAction } from '../../../src chapter2/src/redux/account/accountSlice';
import TableUsers from './TableUsers';
import LayoutBook from './Book';
const { Header, Sider, Content } = Layout;
const LayoutAdmin = () => {
    const user = useSelector(state => state.account.user);
    const isAuthenticated = useSelector(state => state.account.isAuthenticated)
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const urlAvt =`${import.meta.env.VITE_BASE_URL}/images/avatar/${user.avatar}`;

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
            label: <Link to="/my">Quản lý tài khoản</Link>,
            key: '0',
        },
        isAuthenticated === false &&
        {
            label: <Link to='/login'>Đăng nhập</Link>,
            key: '1',
        },
        {
            type: 'divider',
        },
        isAuthenticated === true &&
        {
            label: <Link onClick={() => { handleLogout() }} to="/">Đăng Xuất</Link>,
            key: '3',
        },
    ];
   
    return (
        <div className='admin'>
            <div>
               <h3 style={{paddingLeft:50}}>ADMIN</h3>
                <Layout>
                    <Sider
                        style={{textAlign: 'center',
                        color: '#fff',
                        backgroundColor: 'white',}}
                        width={300}
                        trigger={null} collapsible collapsed={collapsed}>
                        <div className="demo-logo-vertical" />
                        <Menu
                            
                            style={{fontFamily:'sans-serif',fontSize:18,width: 299}}
                            theme="light"
                            mode="inline"
                           
                            defaultSelectedKeys={['1']}
                            items={[
                                {
                                    key: 'Dashboard',
                                    icon: <InsertRowAboveOutlined />,
                                    label: <Link to='/admin'>Dashboard</Link>,
                                },
                                {
                                    key: '2',
                                    icon: <UserOutlined />,
                                    label: 'Manage Users',
                                    children: [
                                        
                                        {   key: 'CRUD',
                                          
                                            icon: <UsergroupAddOutlined />,
                                            label: <Link to='/admin/user'>CRUD</Link>,
                                        },
                                        {
                                            key: 'Files1',
                                            icon: <UsergroupAddOutlined />,
                                            label: <Link to='/Files1'>Files1</Link>,
                                        }
                                    ]
                                },
                                {   key: 'book',
                                    key: 'Manage book',
                                    icon: <BookOutlined />,
                                    label: <Link to='/admin/book'>Manage book</Link>,
                                },
                                {   key: 'oders',
                                    key: 'Manage Orders',
                                    icon: <MoneyCollectOutlined />,
                                    label: <Link  to='/oders'>Manage Orders</Link>,
                                },
                            ]}
                        />
                    </Sider>
                    <Layout>
                        <Header theme='' style={{ padding: 0, background: colorBgContainer }}>
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    fontSize: '16px',
                                    width: 64,
                                    height: 64,
                                }}
                            />
                        </Header>

                        <Content
                            style={{
                                margin: '24px 16px',
                                minHeight: 'auto',
                                background: colorBgContainer,

                            }}
                        >
                            {window.location.pathname==='/admin/user'&&
                            <TableUsers />}
                              {window.location.pathname==='/admin/book'&&
                            <LayoutBook />}
                        </Content>


                    </Layout>
                </Layout>
            </div>
     
            <div className='rightadmin'>
         
                <Dropdown className='drop' menu={{ items }} trigger={['hover']}>
                    <a onClick={(e) => e.preventDefault()}>
                    <Avatar size={50} src={urlAvt}/>
                        <Space 
                        
                        >
                        {isAuthenticated === false && 'Tài khoản'}
                        { isAuthenticated === true && 
                       
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