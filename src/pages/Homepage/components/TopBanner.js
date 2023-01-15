import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthProvider'
import useBlogger from '../../../hooks/useBlogger'
import blogHead from '../../../assets/images/blogHead.webp'

const TopBanner = () => {
    const { user } = useContext(AuthContext)
    const [isBlogger] = useBlogger(user?.email)
    return (
        <div className="hero mb-12 lg:mb-0 md:mb-0">
            <div className="w-full hero-content flex-col lg:flex-row">
                <figure>
                    <img src={blogHead} alt='blog' className="h-80" />
                </figure>
                <div className='lg:w-1/2'>
                    <h2 className='lg:text-3xl text-2xl font-bold text-text-color'>Read Blogs, Articles and <br />Stories at <span className='text-error'>Hash Read</span></h2>
                    {!isBlogger && <div className='mt-6'><Link to='/blogger-request' className=''><button className='btn btn-outline px-8 normal-case rounded-md'>Write Blogs</button></Link></div>}
                </div>
            </div>
        </div>
    )
}

export default TopBanner