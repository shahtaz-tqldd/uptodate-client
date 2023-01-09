import { format } from 'date-fns';
import JoditEditor from 'jodit-react';
import React, { useContext, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { HiLightBulb } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
const BloggerRequestModal = () => {
    const { user, categories } = useContext(AuthContext)
    const navigate = useNavigate()

    const categoryOptions = <>
        {
            categories?.map(c => <option key={c._id}>{c.category}</option>)
        }
    </>
    const [content, setContent] = useState('')

    const editor = useRef(null)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const date = format(new Date(), 'PP')
    const handleBlogSubmit = data => {
        const { title, category, about } = data
        const blogInfo = {
            title,
            category,
            body: content,
            date,
            about,
            author: user.displayName,
            authorEmail: user.email,
            authorImg: user.photoURL,
        }

        fetch('https://dev-blog-server.vercel.app/blogger-request', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(blogInfo)
        })
            .then(res => res.json())
            .then(() => {
                toast.success("Your request has sent successfully!")
                navigate('/')
            })
    }
    return (
        <div>
            <input type="checkbox" id="request-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-11/12 max-w-5xl relative">
                    <label htmlFor="request-modal" className="btn btn-sm btn-error btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-3xl text-primary">Send us a Blog Sample</h3>

                    <form onSubmit={handleSubmit(handleBlogSubmit)} className='mt-5'>
                        <div className='flex justify-between gap-6 mb-5'>
                            {/* title */}
                            <div className='w-3/4 flex flex-col'>
                                <label className='text-neutral text-lg font-bold mb-1'>Title</label>
                                <input {...register("title", { required: "This field can not be empty" })} type="text" placeholder="Title of the Blog" className="input input-bordered" />
                                {errors.title && <span className='text-error'>{errors.title.message}</span>}
                            </div>

                            {/* categories */}
                            <div className='w-1/4 flex flex-col'>
                                <label className='text-neutral text-lg font-bold mb-1'>Select a category</label>
                                <select {...register("category", { required: "This field can not be empty" })} type="text" placeholder="set a category" className="input input-bordered">
                                    {categoryOptions}
                                </select>
                                {errors.category && <span className='text-error'>{errors.category.message}</span>}
                            </div>
                        </div>

                        {/* blog body */}
                        <label className='text-neutral text-lg font-bold mt-5'>Blog content</label>
                        <JoditEditor
                            ref={editor}
                            value={content}
                            minHeight={300}
                            onChange={newContent => setContent(newContent)}
                            className="text-[#000] mt-1"
                        />

                        {/* about you */}
                        <div className='mt-8'>
                            <label className='text-neutral text-lg font-bold'>Tell us about yourself</label>
                            <textarea {...register("about", { required: "This field can not be empty" })} placeholder='Who are you, what makes you a good writter, why do you write...' className='mt-1 w-full h-40 p-2 rounded' />
                            {errors.about && <span className='text-error'>{errors.about.message}</span>}
                        </div>

                        <a href='/payment-condition' target='_blank' rel="noreferrer" className='text-error font-bold my-3 flex items-center gap-2'><HiLightBulb/> Terms and Condition of Payment</a>

                        <div className='flex justify-center mt-10'>
                            <input type="submit" value="submit" className="btn btn-wide btn-primary text-white" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default BloggerRequestModal