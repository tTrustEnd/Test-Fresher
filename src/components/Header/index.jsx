import React from 'react';
import { FaReact } from 'react-icons/fa';
import { SearchOutlined, ShoppingTwoTone } from '@ant-design/icons';
import { DownOutlined } from '@ant-design/icons';
// import type { MenuProps } from 'antd';
import { Badge, Dropdown, Space, Avatar, Input, message } from 'antd';
import './index.scss'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { callLogout } from '../../service/api';
import { doLogoutAction } from '../../../src chapter2/src/redux/account/accountSlice';



const Header = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.account.user);
    const isAuthenticated = useSelector(state => state.account.isAuthenticated)
    const dispatch = useDispatch()

 const handleLogout = async() =>{
    let res = await callLogout();
   if(res?.data){
    dispatch(doLogoutAction());
    message.success('Đăng xuất thành công')
    navigate('/')
   }

 }
 const urlAvt =`${import.meta.env.VITE_BASE_URL}/images/avatar/${user.avatar}`;

    const items = [
        isAuthenticated===true &&
        {
            label: <Link to="/my">Quản lý tài khoản</Link>,
            key: 'my',
        },
        user.role==='ADMIN'&&
        {
            label: <Link to='/admin'>Admin</Link>,
            key: 'admin',
        },
        isAuthenticated===false&&
        
        {
            label: <Link to='/login'>Đăng nhập</Link>,
            key: 'login',
        },
        {
            type: 'divider',
        },
        isAuthenticated===true&&
        {
            label: <Link onClick={()=> handleLogout()} to="/">Đăng Xuất</Link>,
            key: '3',
        },
    ];
    return (
        <div className='header-container'>
            <div className='left-header'>
                <FaReact className='iconreact' /> <span className='titleheader'>MẹCủaBạnn</span>
                <SearchOutlined /> <Input style={{ width: '600px' }} placeholder='Tìm gì hôm nay nào' />
            </div>
            <div className='right-header'>
    
                    <Badge count={5}>
                        <Avatar size="large" icon={<ShoppingTwoTone />} />
                    </Badge>
                   
                   <Dropdown menu={{ items }} trigger={['click']}>
                        <a onClick={(e) => e.preventDefault()}>
                        <Avatar src={urlAvt}/>
                            <Space>
                        {isAuthenticated === false && 'Tài khoản'}

                            {isAuthenticated === true && user.email && <span> {user.email} </span>} 
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
     


            </div>


        </div>

    )
}
export default Header;