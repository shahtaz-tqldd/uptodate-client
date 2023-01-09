import React, { useContext } from 'react'
import { MdAccessTime, MdDateRange } from 'react-icons/md'
import { BsArrowLeftCircleFill, BsFillBookmarkFill, BsHeartFill, BsLink45Deg } from 'react-icons/bs'
import { Link, useLoaderData } from 'react-router-dom'
import useTitle from '../../hooks/useTitle'
import Comments from './Comments'
import { IoIosPaper } from 'react-icons/io'
import { AuthContext } from '../../context/AuthProvider'
import useBlogger from '../../hooks/useBlogger'
import { toast } from 'react-hot-toast'

const BlogDetails = () => {
    const data = useLoaderData()
    const { user } = useContext(AuthContext)
    const [isBlogger] = useBlogger(user?.email)
    const { title, body, img, author, authorImg, date, tags, _id, readTime } = data
    useTitle(title)
    // const location = useLocation()
    const copyLink = window?.location?.href

    const handleSave = () => {
        const saveInfo = {
            postId: _id,
            postTitle: title,
            postAuthor: author,
            savedBy: user?.email
        }
        fetch('http://localhost:5000/blogs/save', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(saveInfo)
        })
            .then(res => res.json())
            .then((data) => {
                if (data.acknowledged) {
                    toast.success("This post has been saved")
                }
                if (data.message) {
                    toast.success(data.message)
                }
            })
    }
    const handleFavourite = () => {
        const favouriteInfo = {
            postId: _id,
            postTitle: title,
            postAuthor: author,
            savedBy: user?.email
        }
        fetch('http://localhost:5000/blogs/favourites', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(favouriteInfo)
        })
            .then(res => res.json())
            .then((data) => {
                if (data.acknowledged) {
                    toast.success("This post has been added to favourite")
                }
                if (data.message) {
                    toast.success(data.message)
                }
            })
    }

    const getLink = (text) => {
        navigator.clipboard.writeText(text)
        toast.success("Link coppied!")
    }

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
            <div className='flex justify-between'>
                <div className='flex items-center gap-6 mt-2'>
                    <div className='flex items-center gap-1'>
                        <MdDateRange />
                        <small>{date}</small>
                    </div>
                    <div className='flex items-center gap-1'>
                        <MdAccessTime />
                        <small>{readTime} {readTime > 1 ? 'mins' : 'min'} read</small>
                    </div>
                </div>
                <div className='flex items-center gap-6'>
                    <button onClick={handleFavourite} className='text-neutral tooltip tooltip-error hover:scale-110 hover:text-error transition duration-300' data-tip="Add this post to favourite"><BsHeartFill /></button>
                    <button onClick={handleSave} className='text-neutral tooltip tooltip-info hover:scale-110 hover:text-primary transition duration-300' data-tip="Save this post for later"><BsFillBookmarkFill /></button>
                    <button onClick={()=>getLink(copyLink)} className='text-neutral tooltip tooltip-success hover:scale-110 hover:text-blue-500 transition duration-300' data-tip="Get link of this post"><BsLink45Deg className='text-2xl' /></button>
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

            {/* write blogs */}
            {!isBlogger && <div className='mt-8'><Link to='/blogger-request' className='flex items-center gap-2 text-info text-lg'><IoIosPaper />Want to Write Blog?</Link></div>}

            {/* comments */}
            <Comments blogId={_id} />

        </section>
    )
}

export default BlogDetails