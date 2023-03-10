import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import JoditEditor from 'jodit-react';
import React, { useContext, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';

const WriteBlogModal = () => {
    const { user, categories } = useContext(AuthContext)
    const navigate = useNavigate()
    const [tagBtn, setTagBtn] = useState(0)
    
    const { data: userData=[]} = useQuery({
        queryKey: ['currentUser'],
        queryFn: async () => {
            const res = await fetch(`https://dev-blog-server.vercel.app/user/${user?.email}`)
            const data = res.json()
            return data
        }
    })

    let tagBtnNum = [1]
    for (let i = 0; i < tagBtn; i++) {
        tagBtnNum.push(1)
    }
    const categoryOptions = <>
        {
            categories?.map(c => <option key={c._id}>{c.category}</option>)
        }
    </>
    const [content, setContent] = useState('')

    const editor = useRef(null)

    const { register, handleSubmit, formState: { errors } } = useForm();
    const date = format(new Date(), 'PP')
    const imgHostKey = process.env.REACT_APP_img_bb_key 
    const readTime = Math.ceil((content.length / 1450))

    const handleBlogSubmit = data => {
        const { title, category } = data
        let tags = [];
        for (const key in data) {
            key.includes('tag') && tags.push(`${data[key]}`)
        }
        const image = data.img[0]
        const blogInfo = {
            title,
            body: content,
            category,
            tags,
            date,
            readTime,
            addedOn: new Date(),
            author: user?.displayName,
            authorId: userData?._id,
            authorEmail: user?.email,
            authorImg: user?.photoURL,
            authorSpeciality: userData?.speciality
        }
        const formData = new FormData()
        formData.append('image', image)
        fetch(`https://api.imgbb.com/1/upload?key=${imgHostKey}`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    const img = imgData.data.url;
                    const blogInfoWithImg = { ...blogInfo, img }

                    fetch('https://dev-blog-server.vercel.app/blogs', {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify(blogInfoWithImg)
                    })
                        .then(res => res.json())
                        .then(() => {
                            toast.success("Blog added successfully")
                            navigate('/')
                        })
                }
            })


    }
    return (
        <div>
            <input type="checkbox" id="blog-write-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-11/12 max-w-5xl relative">
                    <label htmlFor="blog-write-modal" className="btn btn-sm btn-error btn-circle absolute right-2 top-2">???</label>
                    <h3 className="font-bold text-3xl text-primary">Write a new Blog</h3>

                    <form onSubmit={handleSubmit(handleBlogSubmit)} className='mt-5'>
                        {/* title */}
                        <input {...register("title", { required: "This field can not be empty" })} type="text" placeholder="Title of the Blog" className="w-2/3 mr-3 my-2 input input-bordered w-full" />
                        {errors.title && <span className='text-error'>{errors.title.message}</span>}

                        {/* categories */}
                        <select {...register("category", { required: "This field can not be empty" })} type="text" placeholder="set a category" className="my-2 mr-3 input input-bordered w-1/4">
                            {categoryOptions}
                        </select>
                        {errors.category && <span className='text-error'>{errors.category.message}</span>}

                        {/* header image */}
                        <div className='text-lg font-bold text-primary mt-3'>Add a header image</div>
                        <input {...register("img", { required: "This field can not be empty" })} type="file" className="my-2" />
                        {errors.img && <span className='text-error'>{errors.img.message}</span>}


                        {/* blog body */}
                        <JoditEditor
                            ref={editor}
                            value={content}
                            onChange={newContent => setContent(newContent)}
                            className="text-[#000] mt-4"
                        />

                        {/* tags */}
                        <div className='text-lg font-bold text-primary mt-3'>Tags</div>
                        {
                            tagBtnNum.map((tag, index) => <input {...register(`tag-${index + 1}`, { required: "This field can not be empty" })} type="text" placeholder="Ex: Lifestyle" className="my-2 mr-3 input input-bordered w-1/4" />)
                        }
                        <span onClick={() => setTagBtn(tagBtn + 1)} className='btn normal-case rounded-full'>Add more +</span><br />

                        <div className='flex justify-center mt-10'>
                            <input type="submit" value="submit" className="btn btn-wide btn-primary text-white" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default WriteBlogModal