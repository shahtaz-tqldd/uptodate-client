import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthProvider'
import { BsFillBookmarkFill } from 'react-icons/bs'
import { RiPenNibLine } from 'react-icons/ri'
import { toast } from 'react-hot-toast'
import useTitle from '../../../hooks/useTitle'

const SavedPost = () => {
    useTitle('Saved Post')
    const { user } = useContext(AuthContext)
    const { data: saved = [], refetch } = useQuery({
        queryKey: ['saved'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/blogs/saved/${user?.email}`)
            const data = await res.json()
            return data
        }
    })
    const handleDeleteSaved = (id) => {
        fetch(`http://localhost:5000/blogs/saved/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then((data) => {
                if (data.acknowledged) {
                    toast.success("Your saved post deleted!")
                    refetch()
                }
            })
    }
    return (
        <section className='max-w-[1250px] mx-auto mt-24 px-4 min-h-[70vh]'>
            <h2 className='text-3xl font-bold'>{user?.displayName}'s saved post</h2>
            <div className='grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6 mt-12'>
                {
                    saved.length ?
                        saved.map(save => <div className='p-5 rounded-lg bg-white hover:shadow-xl hover:bg-secondary relative'>
                            <h2 className='font-bold text-lg'>{save.postTitle}</h2>
                            <BsFillBookmarkFill className='absolute -top-1 text-xl' />
                            <div className='flex justify-between'>
                                <p className='flex items-center gap-2 -mt-5'><RiPenNibLine /> {save.postAuthor}</p>
                                <div className='mt-5'>
                                    <button className='btn btn-info normal-case btn-sm text-white rounded mr-2'><Link to={`/blogs/${save.postId}`}>See this Post</Link></button>
                                    <button onClick={() => handleDeleteSaved(save._id)} className='btn btn-ghost normal-case btn-sm text-error rounded'>Delete</button>
                                </div>
                            </div>
                        </div>)
                        : <h2 className='text-error text-xl'>You have no saved post!</h2>
                }
            </div>
        </section>
    )
}

export default SavedPost