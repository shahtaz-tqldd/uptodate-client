import React from 'react'

const CommentDeleteModal = () => {
    return (
        <div>
            <input type="checkbox" id="delete-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-error">Alert!</h3>
                    <p className="py-4">Are you sure about this action?</p>
                    <div className="modal-action">
                        <label htmlFor="delete-modal" className="btn">Cancel</label>
                        <button onClick={() => handleDelete(id)} className="ml-3 btn btn-error text-white">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommentDeleteModal