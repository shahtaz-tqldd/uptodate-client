import { format } from 'date-fns'
import React, { useContext, useState } from 'react'
import { toast } from 'react-hot-toast'
import { AuthContext } from '../../context/AuthProvider'
import DeleteModal from '../Dashboard.js/components/DeleteModal'

const CommentCard = ({ comment, refetch }) => {
    const { user } = useContext(AuthContext)
    const [commentId, setCommentId] = useState(null)
    const [edit, setEdit] = useState(false)

    const editedDate = format(new Date(), 'PP');
    const editedTime = format(new Date(), 'p');

    const { comment: commentBody, commenter, commenterPhoto, commenterEmail, date, time, _id } = comment
    const handleCommentDelete = (id) => {
        fetch(`https://dev-blog-server.vercel.app/blogs/comments/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(() => {
                toast.success("Comment deleted successfully")
                refetch()
                setCommentId(null)
            })
    }

    const handleCommentEdit = (e) => {
        e.preventDefault()
        const editedComment = e.target.comment.value
        const editedInfo = {
            editedComment,
            editedDate,
            editedTime,
        }
        fetch(`https://dev-blog-server.vercel.app/blogs/comments/${_id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(editedInfo)
        })
            .then(res => res.json())
            .then(() => {
                toast.success("Comment edited successfully")
                refetch()
                setEdit(false)
            })

    }
    return (
        <div>
            <div className='p-4 bg-secondary rounded-md'>
                <div className='flex items-center gap-2'>
                    <div className="avatar">
                        <div className="w-10 rounded-full">
                            <img src={commenterPhoto} alt="" />
                        </div>
                    </div>

                    <div>
                        <h3 className='font-bold'>{commenter}</h3>
                        <div className='flex gap-6'>
                            <div className='flex gap-3 opacity-50 text-xs'><span>{date}</span> <span>{time}</span></div>
                            {
                                comment?.editedDate &&
                                <div className="tooltip tooltip-info cursor-pointer text-neutral text-xs" data-tip={`${comment?.editedTime} | ${comment?.editedDate}`}>Edited</div>
                            }
                        </div>
                    </div>

                </div>
                {
                    edit ?
                        <form onSubmit={handleCommentEdit} className="ml-12 mt-2">
                            <textarea defaultValue={commentBody} name='comment' className='w-full h-28 rounded-lg p-3' />
                            <div className='flex justify-end gap-3'>
                                <span onClick={() => setEdit(false)} className='btn btn-sm btn-ghost rounded normal-case'>Cancel</span>
                                <input type="submit" className='btn btn-sm btn-primary rounded normal-case' />
                            </div>
                        </form>
                        :
                        <p className='ml-12 mt-2'>{commentBody}</p>


                }
                {
                    (user?.email === commenterEmail && !edit) &&
                    <div className='flex justify-end font-bold gap-5 text-sm'>
                        <label onClick={() => setEdit(true)} className='cursor-pointer text-info'>Edit</label>
                        <label htmlFor='delete-modal' onClick={() => setCommentId(_id)} className='cursor-pointer text-error'>Delete</label>
                    </div>}

            </div>
            {
                commentId &&
                <DeleteModal handleDelete={handleCommentDelete} id={commentId} />
            }
        </div>
    )
}

export default CommentCard