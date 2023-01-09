// import { useQuery } from '@tanstack/react-query'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import BlogCard from './BlogCard'

const Blogs = () => {
    const { categories, search } = useContext(AuthContext)
    const [blogs, setBlogs] = useState([])
    const [category, setCategory] = useState('All')
    useEffect(() => {
        fetch(`http://localhost:5000/blogs?category=${category}&search=${search}`)
            .then(res => res.json())
            .then(data => {
                setBlogs(data);
            })
    }, [category, search])

    return (
        <section>
            <div className='hidden md:flex lg:flex flex-wrap gap-6 mb-8 text-white sticky top-16 bg-base-100 z-10 py-3'>
                <button onClick={() => setCategory('All')} className={`px-4 py-1 rounded-full hover:bg-error ${'All' === category ? 'bg-error' : 'bg-neutral'}`}>All</button>

                {categories?.map((c, i) => <button onClick={() => setCategory(c.category)}
                    className={`px-4 py-1 rounded-full hover:bg-error ${c.category === category ? 'bg-error' : 'bg-neutral'}`}
                    key={i}>
                    {c.category}
                </button>)}
            </div>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6'>
                {
                    blogs.length ?
                        blogs?.map((blog, index) => <BlogCard key={index} blog={blog} />)
                        : <h2 className='text-3xl'>No Blogs Found!</h2>
                }
            </div>
        </section>
    )
}

export default Blogs