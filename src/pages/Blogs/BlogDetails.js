import React from 'react'
import { MdAccessTime, MdDateRange } from 'react-icons/md'
import { BsArrowLeftCircleFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import CommentCard from './CommentCard'
import useTitle from '../../hooks/useTitle'

const BlogDetails = () => {
    const blog = {
        "_id": 1,
        "title": "Something like this",
        "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "date": "Nov 22, 2022",
        "img": "https://images.unsplash.com/photo-1520209759809-a9bcb6cb3241?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aW1nfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
        "author": "Shahtaz Rahman",
        "tags": [
            "technology", "lifestyles", "dream", "life"
        ]
    }
    const { title, body, img, author, date, tags } = blog
    useTitle(title)
    const comments = [
        {
            "commentBody": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
            "commenter": "Selim Reza",
        },
        {
            "commentBody": "Eiusmod tempor incididunt consectetur adipiscing elit, sed do eiusmod tempor",
            "commenter": "Sakkhar Saha",
        },
    ]
    return (
        <section className='max-w-[980px] mx-auto pt-4 px-4'>
            <Link to='/' className='text-primary text-4xl -ml-16 mt-2 fixed'><BsArrowLeftCircleFill /></Link>
            <img src={img} alt="" className='w-full h-[300px] object-cover rounded-lg' />
            <h1 className='text-4xl font-bold mt-4'>{title}</h1>

            {/* author */}
            <div className='flex items-center gap-3 mt-5'>
                <div className="avatar">
                    <div className="w-12 rounded-full">
                        <img src="https://placeimg.com/192/192/people" alt="" />
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
            <div className='mt-5 flex gap-2 text-xs text-error'>
                {
                    tags?.map((tag, i) => <span key={i}>{tag}&nbsp;&nbsp;{(i + 1) < tags.length && '|'}</span>)
                }
            </div>
            {/* blog body */}
            <p className='mt-2 text-[16px]' dangerouslySetInnerHTML={{ __html: body }} />

            {/* comments */}
            <h2 className='mt-6 text-xl font-bold text-primary mb-4'>Comments</h2>
            {/* comment body */}

            <div className='lg:w-3/4 grid grid-cols-1 gap-4'>
                {
                    comments.map((comment, i) => <CommentCard key={i} comment={comment} />)
                }
            </div>
        </section>
    )
}

export default BlogDetails