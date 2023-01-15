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
    const { title, body, img, author, authorImg, authorId, authorSpeciality, date, tags, _id, readTime } = data
    useTitle(title)

    const copyLink = window?.location?.href

    const handleSave = () => {
        const saveInfo = {
            postId: _id,
            postTitle: title,
            postAuthor: author,
            savedBy: user?.email
        }
        fetch('https://dev-blog-server.vercel.app/blogs/save', {
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
        fetch('https://dev-blog-server.vercel.app/blogs/favourites', {
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

    const bgGet = (index) => {
        if (index === 0) {
            return 'bg-blue-300'
        }
        else if (index === 1) {
            return 'bg-red-300'
        }
        else if (index === 2) {
            return 'bg-amber-300'
        }
        else if (index === 3) {
            return 'bg-pink-300'
        }
        else if (index === 4) {
            return 'bg-orange-300'
        }
        else if (index === 5) {
            return 'bg-slate-300'
        }
        else {
            return 'bg-pink-300'
        }
    }

    return (
        <section className='max-w-[980px] mx-auto pt-4 px-4 mb-16'>
            <Link to='/' className='text-primary text-4xl -ml-16 mt-2 fixed'><BsArrowLeftCircleFill /></Link>
            <img src={img} alt="" className='w-full h-[300px] object-cover rounded-lg' />
            <h1 className='text-4xl font-bold mt-4 text-text-color'>{title}</h1>

            {/* author */}
            <div className='flex items-center gap-3 mt-5'>
                <div className="avatar">
                    <div className="w-12 rounded-full">
                        <img src={authorImg} alt="" />
                    </div>
                </div>
                <div className='flex flex-col'>
                    <h2 className='text-lg font-bold text-blue-400 hover:text-info transition duration-300'><Link to={`/blogger/${authorId}`}>{author}</Link></h2>
                    <small>{authorSpeciality}</small>
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
                <div className='flex items-center text-base-content gap-6'>
                    <button onClick={handleFavourite} className='tooltip tooltip-error hover:scale-110 hover:text-error transition duration-300' data-tip="Add this post to favourite"><BsHeartFill /></button>
                    <button onClick={handleSave} className='tooltip tooltip-info hover:scale-110 hover:text-info transition duration-300' data-tip="Save this post for later"><BsFillBookmarkFill /></button>
                    <button onClick={() => getLink(copyLink)} className='tooltip tooltip-success hover:scale-110 hover:text-success transition duration-300' data-tip="Get link of this post"><BsLink45Deg className='text-2xl' /></button>
                </div>
            </div>

            {/* blog topics */}
            <div className='mt-5 flex gap-2 text-xs text-[#333]'>
                {
                    tags?.map((tag, index) => <span className={`${bgGet(index)} px-2 py-1 rounded`} key={index}>{tag}</span>)
                }
            </div>
            
            {/* blog body */}
            <div className='mt-10' dangerouslySetInnerHTML={{ __html: body }} />

            {/* write blogs */}
            {!isBlogger && <div className='mt-8'><Link to='/blogger-request' className='flex items-center gap-2 text-blue-500 text-lg'><IoIosPaper />Hey! Do you want to write Blog and get paid?</Link></div>}

            {/* comments */}
            <Comments blogId={_id} />

        </section>
    )
}

export default BlogDetails