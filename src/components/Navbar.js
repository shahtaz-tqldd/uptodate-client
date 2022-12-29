import React from 'react'
import { Link } from 'react-router-dom'
import { BsFillJournalBookmarkFill } from 'react-icons/bs'

const Navbar = () => {
    const menuItems = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/blogs'>Blogs</Link></li>
        <li><Link to='/about'>About</Link></li>
        <li><Link to='/contact'>Contact</Link></li>
    </>
    return (
        <div className="navbar px-12 bg-primary text-white">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menuItems}
                    </ul>
                </div>
                <Link to='/' className='flex items-center gap-3'>
                    <BsFillJournalBookmarkFill className='text-3xl'/>
                    <div className="flex flex-col">
                        <h2 className='text-xl text-warning font-bold'>Uptodate</h2>
                        <small>A blog site</small>
                    </div>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {menuItems}
                </ul>
            </div>
            <div className="navbar-end">
                <Link to='/login' className="btn btn-sm rounded normal-case btn-warning mr-3">Login</Link>
                <Link to='/register' className="btn btn-sm rounded normal-case btn-warning btn-outline">Sign Up</Link>
            </div>
        </div>
    )
}

export default Navbar