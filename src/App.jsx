import React, { useEffect, useState } from 'react';
import LoginPage from './pages/login/login';
import { Outlet } from "react-router-dom";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Header from './components/Header';
import BookPage from './pages/book';
import Home from './components/Home';
import Register from './pages/register/register';
import { callFetchAccount } from './service/api';
import { useDispatch, useSelector } from 'react-redux';
import { doGetAccount } from './redux/account/accountSlice';
import Loading from './components/Loading';
import AdminPage from './pages/admin';
import ProtectedRoute from './components/ProtectedRoute/idnex';
import NotFound from './pages/404NF';
import Footer from './components/Footer';
import LayoutAdmin from './components/Admin/LayoutAdmin';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "react-image-gallery/styles/scss/image-gallery.scss";
import Order from './pages/order';
import OrderSuccess from './pages/order/OrderSuccess';
import History from './pages/order/History';

const Layout = () => {
  const [searchTerm,setSearchTerm] =useState('');
  return (
    <div className='layout-app'>
      <Header  />
      <Outlet context={[searchTerm,setSearchTerm]} />
      <Footer />

    </div>
  )
}


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "order",
        element: <Order />,
      },
      {
        path:"order/success",
        element:<OrderSuccess/>
      },
      {
        path:"order/history",
        element:<History/>
      },
      {
        path: "book/:slug", //theem :slug là ta đang muốn định nghĩa thêm 1 tham số (params)
        element: <BookPage />,
      },
    ],
  },
  {
    path: "/admin",
    element:
      <ProtectedRoute>
        <LayoutAdmin />
      </ProtectedRoute>,
    errorElement: <NotFound />,
    children: [
      {
        path: "user",
        element:
          <ProtectedRoute>
           <Order />
          </ProtectedRoute>
        ,
      },
      {
        path: "book",
        element:
          <ProtectedRoute>
            <BookPage />
          </ProtectedRoute>
        ,
      },
      {
        path: "orders",
        element:
        <ProtectedRoute>
          <BookPage />
          </ProtectedRoute>
        ,
      },
    ],
  },

  {
    path: "/login",
    element: <LoginPage />,

  },
  {
    path: "/register",
    element: <Register />,

  },


]);


export default function App() {
  const isAuthenticated = useSelector(state => state.account.isAuthenticated)
  const isLoading = useSelector(state => state.account.isLoading)
  const dispatch = useDispatch();

  const getAccount = async () => {
    const res = await callFetchAccount();
  
  }
  useEffect(() => {
    getAccount()
  }, [])
  return (
    <>
        <RouterProvider router={router} />
    
    </>
  )

}
