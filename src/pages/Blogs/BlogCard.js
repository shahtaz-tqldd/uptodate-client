import React from 'react'
import { MdDateRange } from 'react-icons/md'
import { Link } from 'react-router-dom'

const BlogCard = ({ blog }) => {
    const { title, body, date, author, authorImg, img, _id, tags, category } = blog
    
    return (
        <Link to={`/blogs/${_id}`} className='hover:bg-secondary hover:shadow-lg duration-300 transition rounded-lg relative'>
            <img src={img} alt="img" className='w-full h-52 object-cover rounded-t-lg' />
            <div className='p-3'>
                <h2 className='text-xl font-bold'>{title}</h2>
                <div className='flex items-center gap-2 my-2'>
                    <div className="avatar">
                        <div className="w-8 rounded-full">
                            <img src={authorImg} alt="" />
                        </div>
                    </div>
                    <h2 className='text-sm pb-2'>{author}</h2>
                </div>
                {/* <p dangerouslySetInnerHTML={{ __html: body.slice(0, 200) }}></p> */}
                <p className='absolute top-3 right-0 bg-white px-4 rounded-l-full opacity-90'>{category}</p>
                {/* <p>{body.slice(0, 130) + '...Read more'}</p> */}
                <div className='flex gap-2 text-xs '>

                {tags.map(tag => <span className='px-3 py-1 bg-accent rounded'>{ tag}</span>)}
                </div>
                <div className='flex items-center justify-between mt-3'>
                    <div className='flex items-center text-blue-400 gap-2'>
                        <MdDateRange />
                        <small>{date}</small>
                    </div>
                    <small className='text-pink-500'>10 mins read</small>
                </div>
            </div>

        </Link>
    )
}

export default BlogCard