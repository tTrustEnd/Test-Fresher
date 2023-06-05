import React, { useEffect, useState } from 'react';
import LoginPage from './pages/login/login';
import { Outlet } from "react-router-dom";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Contact from './pages/contact';
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

const Layout = () => {
  return (
    <div className='layout-app'>
      <Header />
      <Outlet />
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
        path: "contact",
        element: <Contact />,
      },
      {
        path: "book",
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
            <Contact />
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
        path: "oders",
        element:

          <BookPage />

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
    if (
      window.location.pathname === '/login'
      || window.location.pathname === '/register'
    ) return;
    const res = await callFetchAccount();
    if (res && res.data) {
      dispatch(doGetAccount(res.data))
    }
  }
  useEffect(() => {
    getAccount()
  }, [])
  return (
    <>
      {isLoading === false || window.location.pathname === '/login'
        || window.location.pathname === '/'
        || window.location.pathname === '/register'
        ?
        <RouterProvider router={router} />
        : <Loading />
      }
      {/* <RouterProvider router={router} /> */}
      {/* <Loading/> */}
    </>
  )

}
