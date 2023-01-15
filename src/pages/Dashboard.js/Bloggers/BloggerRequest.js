import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { MdRemoveCircle, MdVerified } from 'react-icons/md'
import Loader from '../../../components/Loader/Loader'
import useTitle from '../../../hooks/useTitle'
import BloggerContentModal from '../components/BloggerContentModal'
import ConfirmModal from '../components/ConfirmModal'
import DeleteModal from '../components/DeleteModal'

const BloggerRequest = () => {
    useTitle('Blogger Request')
    const [confirm, setConfirm] = useState(null)
    const [id, setId] = useState(null)
    const [data, setData] = useState(null)
    const { data: bloggerReq = [], refetch, isLoading } = useQuery({
        queryKey: ['bloggerReq'],
        queryFn: async () => {
            const res = await fetch('https://dev-blog-server.vercel.app/blogger-request')
            const data = await res.json()
            return data;
        }
    })
    const handleDelete = id => {
        fetch(`https://dev-blog-server.vercel.app/blogger-request/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(() => {
                toast.success('Request removed successfully!')
                refetch()
                setId(null)
            })
    }
    const handleConfirm = (email, id) => {
        console.log(confirm?.speciality)
        const bloggerSpeciality = {
            speciality: confirm?.speciality
        }
        fetch(`https://dev-blog-server.vercel.app/blogger-request/${email}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(bloggerSpeciality)
        })
            .then(res => res.json())
            .then(() => {
                toast.success('Blogger added successfully!')
                refetch()
                setConfirm(null)
                handleDelete(id)
            })
    }
    if (isLoading) {
        return <Loader />
    }
    return (
        <div className="ml-10 w-[150%]">
            <h2 className='font-bold text-2xl mt-6 mb-4 uppercase'>Blogger Request</h2>
            {
                bloggerReq.length ?
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Sample</th>
                                <th>Approve</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bloggerReq.map((blogger, index) => <tr key={index}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={blogger.authorImg} alt={blogger.author} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{blogger.author}</div>
                                            <div className="text-sm opacity-50">{ blogger.speciality}</div>
                                        </div>
                                    </div>
                                </td>
                                <th>
                                    <label htmlFor='blog-content-modal' onClick={() => setData({ body: blogger.body, title: blogger.title })} className="cursor-pointer flex items-center text-primary text-sm gap-1">Content</label>
                                </th>
                                <th>
                                    <label htmlFor='confirm-modal' onClick={() => setConfirm({email:blogger.authorEmail, id: blogger._id, speciality: blogger.speciality })} className="cursor-pointer flex items-center text-info text-sm gap-1"><MdVerified className='mt-[2px]' />Approve</label>
                                </th>
                                <th>
                                    <label htmlFor='delete-modal' onClick={() => setId(blogger._id)} className="cursor-pointer flex items-center text-error text-sm gap-1">Remove<MdRemoveCircle className='mt-1' /></label>
                                </th>
                            </tr>
                            )}
                        </tbody>
                    </table>
                    : <h2 className='text-3xl mt-12'>No Blogger Request!</h2>
            }



            {
                id &&
                <DeleteModal handleDelete={handleDelete} id={id} />
            }
            {confirm &&
                <ConfirmModal handleConfirm={handleConfirm} confirm={confirm} />
            }
            {
                data &&
                <BloggerContentModal data={data} />
            }

        </div>
    )
}

export default BloggerRequest