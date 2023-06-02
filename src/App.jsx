import React, { useState } from 'react';
import LoginPage from './pages/login/login';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
const Layout = () => {
  return (
    <>
    Hello
    </>
  )
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    errorElement:<div>404 not Found </div>,
  },
  {
    path: "/login",
    element: <LoginPage/>,
   
  },

]);
export default function App() {
  return (
    <>
         <RouterProvider router={router} />
    </>
  )

}
