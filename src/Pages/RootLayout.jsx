import React from 'react'
import  Nav  from '../Component/Nav'
import { Outlet } from 'react-router-dom'


export default function RootLayout () {
  return (
    <>
    <Nav/>
    <Outlet/>
    </>
    // <div>RootLayout</div>
  )
}


