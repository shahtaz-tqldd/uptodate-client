import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const Main = () => {
    return (
        <>
            <Navbar />
            <div className='mt-16'>
                <Outlet />
            </div>
            <Footer />
        </>
    )
}

export default Main