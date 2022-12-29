import React from 'react'
import { BiSearch } from 'react-icons/bi'

const SearchBar = () => {
    return (
        <div className="hero">
            <div className="w-full hero-content flex-col lg:flex-row">
                <figure className=''>
                    <img src="https://cdni.iconscout.com/illustration/premium/thumb/blog-writer-working-on-article-5691583-4759515.png" alt='blog' className="h-80" />
                </figure>
                <div className='w-1/2'>
                    <form className='flex items-center'>
                        <input type="text" placeholder="Search Blog" className="input bg-white input-bordered rounded-full border-primary w-full max-w-xs focus:outline-none focus:bg-secondary" />
                        <button type="submit" className="btn btn-primary rounded-full -ml-10">< BiSearch className='text-xl' /></button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SearchBar