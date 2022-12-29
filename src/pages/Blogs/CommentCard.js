import React from 'react'

const CommentCard = ({ comment }) => {
    const { commentBody, commenter }= comment
    return (
        <div>
            <div className='p-4 bg-secondary rounded-md'>
                <div className='flex items-start gap-2'>
                    <div className="avatar">
                        <div className="w-8 rounded-full">
                            <img src="https://placeimg.com/192/192/people" alt="" />
                        </div>
                    </div>
                    <h3><b>{commenter}</b></h3>
                </div>
                <p className='ml-10 -mt-2'>{commentBody}</p>
            </div>
        </div>
    )
}

export default CommentCard