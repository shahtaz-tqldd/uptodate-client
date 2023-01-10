import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthProvider'
import useBlogger from '../../../hooks/useBlogger'
import { IoIosPaper } from 'react-icons/io'
import blogHead from '../../../assets/images/blogHead.webp'

const SearchBar = () => {
    const { user } = useContext(AuthContext)
    const [isBlogger] = useBlogger(user?.email)
    return (
        <div className="hero">
            <div className="w-full hero-content flex-col lg:flex-row">
                <figure>
                    <img src={blogHead} alt='blog' className="h-80" />
                </figure>
                <div className='lg:w-1/2'>
                    <h2 className='text-3xl font-bold text-neutral'>Read Blogs, Articles and <br />Stories at <span className='text-primary'>Hash Read</span></h2>
                    {!isBlogger && <div className='mt-8'><Link to='/blogger-request' className='flex items-center gap-2 text-blue-500 text-lg'><IoIosPaper/>Want to Write Blog?</Link></div>}
                </div>
            </div>
        </div>
    )
}

export default SearchBar