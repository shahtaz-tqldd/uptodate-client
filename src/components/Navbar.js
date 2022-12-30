import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { BsFillJournalBookmarkFill } from 'react-icons/bs'
import { IoIosArrowDropdownCircle } from 'react-icons/io'
import { AuthContext } from '../context/AuthProvider'
import { toast } from 'react-hot-toast'
import { BiSearch } from 'react-icons/bi'
const categories = [
    "All",
    "Lifestyle",
    "Technology",
    "Science",
    "Philosophy",
    "Art",
    "Culture",
    "Education",
    "Sports",
    "Travel"
]
const Navbar = () => {
    const { user, logout } = useContext(AuthContext)
    const menuItems = <>
        {
            categories.map((c, i) => <li key={i} className='text-primary'><Link to='/'>{c}</Link></li>)
        }

    </>
    const handleLogout = () => {
        logout()
            .then(() => {
                toast.error('You are logged out!')
            })
            .catch(err => console.error(err))
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
                    <BsFillJournalBookmarkFill className='text-3xl' />
                    <div className="flex flex-col">
                        <h2 className='text-xl text-warning font-bold'>Uptodate</h2>
                        <small>A blog site</small>
                    </div>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <form className='flex items-center'>
                        <input type="text" placeholder="Search Blog" className="input bg-white text-[#333] input-bordered rounded-full w-[300px] focus:outline-none focus:bg-secondary" />
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
                                <ul tabIndex={0} className="menu menu-compact dropdown-content -ml-44 mt-6 p-2 shadow bg-secondary rounded-lg text-primary w-52">
                                    <li><Link to='/dashboard'>Dashboard</Link></li>
                                    <li><Link to='/dashboard/Blogs'>Blogs</Link></li>
                                    <li><button onClick={handleLogout} className="bg-error font-bold mt-4 w-full text-white hover:bg-[#E97777]">Logout</button></li>
                                </ul>
                            </div>
                        </div>
                        :
                        <>
                            <Link to='/login' className="btn btn-sm rounded normal-case btn-warning mr-3">Login</Link>
                            <Link to='/register' className="btn btn-sm rounded normal-case btn-warning btn-outline">Sign Up</Link>
                        </>
                }
            </div>
        </div>
    )
}

export default Navbar