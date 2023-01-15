import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { MdAccessTime, MdDateRange } from 'react-icons/md'
import { Link, useLoaderData } from 'react-router-dom'
import Loader from '../../../components/Loader/Loader'
import useTitle from '../../../hooks/useTitle'

const ProfilePage = () => {
    const data = useLoaderData()
    const { displayName, photoURL, email, speciality } = data
    useTitle(displayName)
    const { data: blogs = [], isLoading } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await fetch(`https://dev-blog-server.vercel.app/dashboard/blogs/${email}`)
            const data = await res.json()
            return data;
        }
    })
    if (isLoading) {
        return <Loader />
    }
    return (
        <section className='max-w-[1250px] min-h-[80vh] mx-auto px-4 flex flex-col lg:flex-row lg:gap-12 gap-8 mt-24 mb-16'>
            <div className='lg:w-1/4 h-72 p-6 bg-secondary rounded-xl shadow-lg flex flex-col items-center'>
                <img src={photoURL} alt="" className='h-40 w-40 object-cover rounded-full' />
                <h2 className='font-bold text-2xl text-base-content mt-3'>{displayName}</h2>
                <p>{speciality}</p>
            </div>
            <div className='lg:w-3/4'>
                <h2 className='text-2xl font-bold'>{displayName}'s Blogs</h2>
                <div className='grid lg:grid-cols-2 grid-cols-1 gap-6 mt-10'>
                    {
                        blogs.length ?
                        blogs.map(blog => <Link to={`/blogs/${blog._id}`} className='p-5 bg-secondary rounded-lg relative hover:shadow-xl flex flex-col justify-between'>

                            <div>
                                <h2 className='font-bold'>{blog.title}</h2>
                                <div className='flex flex-wrap gap-3 my-3'>
                                    {blog.tags.map(tag => <span className='bg-neutral px-3 py-1 text-xs rounded'>{tag}</span>)}
                                </div>
                                <h2 className='absolute -top-3 right-2 bg-primary text-white px-4 py-1 rounded-full'>{blog.category}</h2>
                            </div>

                            <div className='flex justify-between mt-2'>
                                <div className='flex items-center gap-1'>
                                    <MdDateRange />
                                    <small>{blog.date}</small>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <MdAccessTime />
                                    <small>{blog.readTime} {blog.readTime > 1 ? 'mins' : 'min'} read</small>
                                </div>
                            </div>
                        </Link>)
                            : <h2 className='text-3xl mt-12'>No Blogs Found!</h2>
                    }
                </div>
            </div>

        </section>
    )
}

export default ProfilePage