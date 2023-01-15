import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import ComponentsLoader from '../../components/Loader/ComponentsLoader'
import { AuthContext } from '../../context/AuthProvider'
import BlogCard from './BlogCard'
const LIMIT = 6;
const Blogs = () => {
    const { categories, search, setSearch } = useContext(AuthContext)
    const [category, setCategory] = useState('All')
    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState([])
    const [activePage, setActivePage] = useState(1)
    const [totalBlogs, setTotalBlogs] = useState(0)

    
    useEffect(() => {
        fetchData()
    }, [category, search])

    const fetchData = () => {
        axios({
            method: 'GET',
            url: 'https://dev-blog-server.vercel.app/blogs',
            params: {
                page: activePage,
                size: LIMIT,
                category,
                search
            }
        }).then(({ data }) => {
            if (data.search) {
                setLoading(false)
                setActivePage(1)
                setBlogs([ ...data.result])
                setTotalBlogs(data.total)
            } else {
                setLoading(false)
                setActivePage(activePage + 1)
                setBlogs([...blogs, ...data.result])
                setTotalBlogs(data.total)
            }
        })
            .catch(e => console.error(e))
    }
    const handleCategory = (c) => {
        setBlogs([])
        setActivePage(1)
        setCategory(c)
        setSearch('')
    }

    if (loading) {
        return <ComponentsLoader />
    }
    return (
        <section>
            <div className='hidden md:flex lg:flex flex-wrap gap-4 mb-8 text-white sticky top-16 bg-base-100 z-10 py-3'>
                <button disabled={'All' === category} onClick={() => handleCategory('All')} className={`px-4 py-1 text-sm rounded hover:bg-blue-500 ${'All' === category ? 'bg-blue-500' : 'bg-blue-300'}`}>All</button>

                {categories?.map((c, i) => <button disabled={c.category === category} onClick={() => handleCategory(c.category)}
                    className={`px-3 py-1 rounded text-sm hover:bg-blue-500 ${c.category === category ? 'bg-blue-500 disabled' : 'bg-blue-300'}`}
                    key={i}>
                    {c.category}
                </button>)}
            </div>
            {
                !blogs.length ?
                    <h2 className='text-3xl'>No Blogs Found!</h2>
                    :
                    <InfiniteScroll
                        dataLength={blogs.length}
                        next={fetchData}
                        hasMore={blogs.length < totalBlogs}
                        loader={<ComponentsLoader />}
                        endMessage={<h2 className='text-center text-xl font-bold mt-12'>That's all for now!</h2>}
                        style={{ overflowY: 'hidden' }}
                    >
                        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6'>
                            {blogs?.map((blog, index) => <BlogCard key={index} blog={blog} />)}
                        </div>
                    </InfiniteScroll>
            }
        </section>
    )
}

export default Blogs