import React, { useContext, useEffect, useState } from 'react'
// icons
import { BsFillBookmarkFill, BsFillHeartFill } from 'react-icons/bs'
import { IoIosArrowDropdownCircle } from 'react-icons/io'
import { MdDarkMode, MdDashboardCustomize, MdPersonAddAlt1 } from 'react-icons/md'
import { CgLogOut } from 'react-icons/cg'
import { CiLight } from 'react-icons/ci'
import { BiSearch } from 'react-icons/bi'

import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthProvider'
import { toast } from 'react-hot-toast'
import useAdmin from '../hooks/useAdmin'
import useBlogger from '../hooks/useBlogger'
import useAccepted from '../hooks/useAccepted'
const Navbar = () => {
    // darkmode
    const [dark, setDark] = useState(false)
    if (dark) { localStorage.setItem('dark-mode', true) }
    else { localStorage.setItem('dark-mode', false) }
    const mode = JSON.parse(localStorage.getItem("dark-mode"))
    useEffect(() => {
        if (mode) {
            document.querySelector("html").setAttribute("data-theme", "darkTheme")
        } else {
            document.querySelector("html").setAttribute("data-theme", "lightTheme")
        }
    }, [mode])

    // load data from context
    const { categories } = useContext(AuthContext)
    const { user, logout, setSearch } = useContext(AuthContext)

    // get data from hooks
    const [isAdmin] = useAdmin(user?.email)
    const [isBlogger] = useBlogger(user?.email)
    const [isAccepted] = useAccepted(user?.email)

    const navigate = useNavigate()
    const menuItems = <>
        {
            categories?.map((c, i) => <li key={i} className='text-primary'><Link to='/'>{c.category}</Link></li>)
        }

    </>
    // logout 
    const handleLogout = () => {
        logout()
            .then(() => {
                toast.error('You are logged out!')
                navigate('/')
            })
            .catch(err => console.error(err))
    }

    // search blogs
    const handleSearch = (e) => {
        e.preventDefault()
        const keywords = e.target.keywords.value
        setSearch(keywords)
        navigate('/')
        e.target.reset()
    }
    return (
        <div className="navbar lg:px-20 bg-primary text-white fixed top-0 left-0 right-0 z-30">
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
                    <div className="flex flex-col">
                        <h2 className='text-xl text-warning font-bold'>Hash Read</h2>
                        <small>A blog site</small>
                    </div>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <form onSubmit={handleSearch} className='flex items-center'>
                        <input type="text" name="keywords" placeholder="Search Blog" className="input bg-[#fec] text-[#333] input-bordered rounded-full w-[300px] focus:outline-none focus:bg-base" />
                        <button type="submit" className="btn btn-secondary rounded-full -ml-10">< BiSearch className='text-xl' /></button>
                    </form>
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ?
                        <div className='flex items-center gap-3'>
                            <div className="avatar">
                                <div className="w-12 rounded-full">
                                    <img src={user.photoURL} alt="" />
                                </div>
                            </div>
                            <div className="dropdown">
                                <label tabIndex={0}>
                                    <IoIosArrowDropdownCircle className='text-xl cursor-pointer text-warning' />
                                </label>
                                <ul tabIndex={0} className="menu menu-compact dropdown-content -ml-44 mt-6 p-2 shadow bg-secondary rounded-lg text-base-content w-52">
                                    <li><Link to='/dashboard/favourite' className='flex items-center gap-2 font-bold'><BsFillHeartFill />Favourite</Link></li>
                                    <li><Link to='/dashboard/saved' className='flex items-center gap-2 font-bold'><BsFillBookmarkFill />Saved</Link></li>
                                    {
                                        (isAdmin || isBlogger) &&
                                        <>
                                            <li><Link to='/dashboard' className='flex items-center gap-2 font-bold'><MdDashboardCustomize />Dashboard</Link></li>
                                        </>
                                    }
                                    {
                                        (isAccepted && !isBlogger) &&
                                        <>
                                            <li><Link to='/payment' className='flex items-center gap-2 font-bold'><MdPersonAddAlt1 />Register</Link></li>
                                        </>
                                    }
                                    <li><button onClick={handleLogout} className="bg-error font-bold mt-4 w-full text-white hover:bg-[#E97777] flex items-center gap-[5px]"><CgLogOut className='text-xl pt-[2px]' /> Logout</button></li>
                                </ul>
                            </div>
                        </div>
                        :
                        <>
                            <Link to='/login' className="btn btn-sm rounded normal-case btn-warning mr-3">Login</Link>
                            <Link to='/register' className="hidden lg:flex md:flex btn btn-sm rounded normal-case btn-warning btn-outline">Sign Up</Link>
                        </>
                }
                <button onClick={() => setDark(!dark)} className='text-2xl ml-4'>{!dark ? <span><MdDarkMode /></span> : <span><CiLight className='text-yellow-500' /></span>}</button>
            </div>
        </div>
    )
}

export default Navbar