import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import React, { useContext, useState } from 'react'
import { toast } from 'react-hot-toast'
import { AuthContext } from '../../context/AuthProvider'
import CommentCard from './CommentCard'
const Comments = ({ blogId }) => {
    const {user} = useContext(AuthContext)
    const [commentWritten, setCommentWritten] = useState('')
    
    const date = format(new Date(), 'PP')
    const time = format(new Date(), 'p')
    const { data: comments =[], refetch } = useQuery({
        queryKey: ['comments'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/blogs/comments/${blogId}`)
            const data = await res.json()
            return data
        }
    })
    
    const handleComment = e => {
        e.preventDefault()
        const comment = e.target.comment.value
        
        const newComment = {
            blogId,
            comment,
            commenter: user?.displayName,
            commenterEmail: user?.email,
            commenterPhoto: user?.photoURL,
            date,
            time
        }
        fetch(`http://localhost:5000/blogs/comments`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newComment)
        })
            .then(res => res.json())
            .then(() => {
                toast.success("You have commented on this post")
                setCommentWritten('')
                refetch()
            })
    }
    return (
        <div className='lg:w-3/4'>
            {/* comments */}
            <h2 className='mt-12 text-xl font-bold text-primary mb-4'>Comments</h2>

            {/* new comments */}
            <form onSubmit={handleComment}>
                <textarea value={commentWritten} onChange={(e)=>setCommentWritten(e.target.value)} placeholder='Write your comment' name='comment' className='w-full h-36 rounded-lg p-3' />
                <div className='flex justify-end'>
                    <input type="submit" className='btn btn-primary px-8 rounded-md normal-case' disabled={commentWritten? false : true} />
                </div>
            </form>

            {/* comment body */}

            <div className='grid grid-cols-1 gap-4 mt-4'>
                {
                    comments?.map((comment, i) => <CommentCard key={i} comment={comment} refetch={refetch} />)
                }
            </div></div>
    )
}

export default Comments