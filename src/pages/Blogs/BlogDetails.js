import React from 'react'
import { MdAccessTime, MdDateRange } from 'react-icons/md'
import { BsArrowLeftCircleFill } from 'react-icons/bs'
import { Link, useLoaderData } from 'react-router-dom'
import useTitle from '../../hooks/useTitle'
import Comments from './Comments'

const BlogDetails = () => {
    const data = useLoaderData()
    const { title, body, img, author, authorImg, date, tags, _id } = data
    useTitle(title)
    
    return (
        <section className='max-w-[980px] mx-auto pt-4 px-4'>
            <Link to='/' className='text-primary text-4xl -ml-16 mt-2 fixed'><BsArrowLeftCircleFill /></Link>
            <img src={img} alt="" className='w-full h-[300px] object-cover rounded-lg' />
            <h1 className='text-4xl font-bold mt-4 text-neutral'>{title}</h1>

            {/* author */}
            <div className='flex items-center gap-3 mt-5'>
                <div className="avatar">
                    <div className="w-12 rounded-full">
                        <img src={authorImg} alt="" />
                    </div>
                </div>
                <div className='flex flex-col'>
                    <h2 className='text-lg font-bold'>{author}</h2>
                    <small>Tech Blogger</small>
                </div>
            </div>

            {/* blog short detail */}

            <div className='flex items-center gap-6 mt-2'>
                <div className='flex items-center gap-1'>
                    <MdDateRange />
                    <small>{date}</small>
                </div>
                <div className='flex items-center gap-1'>
                    <MdAccessTime />
                    <small>10 mins read</small>
                </div>
            </div>

            {/* blog topics */}
            <div className='mt-5 flex gap-2 text-xs text-dark'>
                {
                    tags?.map((tag, i) => <span className='bg-red-300 px-2 py-1 rounded' key={i}>{tag}</span>)
                }
            </div>
            {/* blog body */}
            <div className='mt-2 text-[16px]' dangerouslySetInnerHTML={{ __html: body }} />
            <Comments blogId={_id} />
            
        </section>
    )
}

export default BlogDetails