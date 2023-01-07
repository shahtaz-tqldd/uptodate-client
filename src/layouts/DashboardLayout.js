import React, { useContext } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { VscWorkspaceTrusted } from 'react-icons/vsc'
import { BiGridAlt, BiNews, BiOutline } from 'react-icons/bi'
import WriteBlogModal from '../pages/Dashboard.js/components/WriteBlogModal'
import useAdmin from '../hooks/useAdmin'
import { AuthContext } from '../context/AuthProvider'

const DashboardLayout = () => {
    const { user } = useContext(AuthContext)
    const [isAdmin] = useAdmin(user?.email)
    const location = useLocation()
    const barLocal = location?.pathname?.split('/').slice(-1)[0]
    return (
        <div className='flex'>
            <div className="lg:w-1/5 flex flex-col gap-3 text-[16px] bg-secondary px-10 pt-10 pb-16 fixed top-16">
                <Link
                    to='/dashboard'
                    className={`flex items-center gap-2 ${barLocal === 'dashboard' && 'tab-active text-success font-bold'}`}>
                    <BiGridAlt />My Profile
                </Link>

                <Link
                    to='/dashboard/blogs'
                    className={`flex items-center gap-2 ${barLocal === 'blogs' && 'tab-active text-success font-bold'}`}>
                    <BiNews />Blogs
                </Link>

                {
                    isAdmin &&
                    <>
                        <Link
                            to='/dashboard/bloggers'
                            className={`flex items-center gap-2 ${barLocal === 'bloggers' && 'tab-active text-success font-bold'}`}>
                            <BiOutline />Bloggers
                        </Link>
                        <Link
                            to='/dashboard/blogger-request'
                            className={`flex items-center gap-2 ${barLocal === 'blogger-request' && 'tab-active text-success font-bold'}`}>
                            <BiOutline />Blogger Request
                        </Link>

                        <Link
                            to='/dashboard/users'
                            className={`flex items-center gap-2 ${barLocal === 'users' && 'tab-active text-success font-bold'}`}>
                            <VscWorkspaceTrusted />All Users
                        </Link>

                        <Link
                            to='/dashboard/categories'
                            className={`flex items-center gap-2 ${barLocal === 'categories' && 'tab-active text-success font-bold'}`}>
                            <BiOutline />Categories
                        </Link>
                    </>
                }
            </div>
            <div className='ml-[20%] min-h-[60vh]'>
                <label htmlFor="blog-write-modal" className='btn btn-sm btn-error text-white rounded px-12 absolute right-16 top-20'>Write +</label>
                <WriteBlogModal />
                <Outlet />
            </div>
        </div>
    )
}

export default DashboardLayout