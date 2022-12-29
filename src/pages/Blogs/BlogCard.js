import React from 'react'
import { MdDateRange } from 'react-icons/md'
import { Link } from 'react-router-dom'

const BlogCard = ({ blog }) => {
    const { title, body, date, author, img, _id } = blog
    return (
        <Link to={`/blogs/${_id}`} className='hover:bg-secondary hover:shadow-lg duration-300 transition rounded-lg'>
            <img src={img} alt="img" className='w-full h-56 object-cover rounded-t-lg' />
            <div className='p-3'>
                <h2 className='text-xl font-bold'>{title}</h2>
                <div className='flex items-center gap-2 my-2'>
                    <div className="avatar">
                        <div className="w-8 rounded-full">
                            <img src="https://placeimg.com/192/192/people" alt="" />
                        </div>
                    </div>
                    <h3><b>{author}</b></h3>
                </div>
                <p>{body.slice(0, 130) + '...Read more'}</p>

                <div className='flex items-center justify-between mt-3'>
                    <div className='flex items-center gap-2'>
                        <MdDateRange />
                        <small>{date}</small>
                    </div>
                    <small>10 mins read</small>
                </div>
            </div>

        </Link>
    )
}

export default BlogCard