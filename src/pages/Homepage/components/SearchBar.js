import React from 'react'
import { Link } from 'react-router-dom'

const SearchBar = () => {
    return (
        <div className="hero">
            <div className="w-full hero-content flex-col lg:flex-row">
                <figure className=''>
                    <img src="https://cdni.iconscout.com/illustration/premium/thumb/blog-writer-working-on-article-5691583-4759515.png" alt='blog' className="h-80" />
                </figure>
                <div className='lg:w-1/2'>
                    <h2 className='text-3xl font-bold text-neutral'>Read Blogs, Articles and <br />Stories at <span className='text-primary'>Uptodate</span></h2>
                    <div className='mt-12'><Link to='/blogger-request'>Want to Right Blog?</Link></div>
                </div>
            </div>
        </div>
    )
}

export default SearchBar