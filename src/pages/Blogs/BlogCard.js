import React from 'react'
import { MdDateRange } from 'react-icons/md'
import { Link } from 'react-router-dom'

const BlogCard = ({ blog }) => {
    const { title, readTime, date, author, authorSpeciality, authorImg, img, _id, tags, category } = blog

    return (
        <Link to={`/blogs/${_id}`} className='hover:bg-neutral hover:shadow-lg duration-300 transition rounded-lg relative'>
            <img src={img} alt="img" className='w-full h-52 object-cover rounded-t-lg' />
            <div className='p-3 flex flex-col justify-between h-48'>
                {/* title of the blog */}
                <div>
                    <h2 className='text-xl font-bold text-text-color'>{title}</h2>
                </div>

                {/* author */}
                <div className='flex items-center gap-2 my-2'>
                    <div className="avatar">
                        <div className="w-8 rounded-full">
                            <img src={authorImg} alt="" />
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <h2 className='text-sm font-bold'>{author}</h2>
                        <span className='text-xs'>{authorSpeciality}</span>
                    </div>
                </div>

                {/* category */}
                <p className='absolute top-3 right-0 bg-success opacity-90 px-5 py-[6px] text-[#333] rounded-l-lg shadow-lg'>{category}</p>
                
                <div>
                    {/* tags */}
                    <div className='flex gap-2 text-xs '>
                        {tags.map(tag => <span className='px-3 py-1 bg-secondary rounded'>{tag}</span>)}
                    </div>
                    <div className='flex items-center justify-between mt-3'>
                        <div className='flex items-center text-blue-400 gap-2'>
                            <MdDateRange />
                            <small>{date}</small>
                        </div>
                        <small className='text-pink-500'>{readTime} {readTime > 1 ? 'mins' : 'min'} read</small>
                    </div>
                </div>
            </div>

        </Link>
    )
}

export default BlogCard