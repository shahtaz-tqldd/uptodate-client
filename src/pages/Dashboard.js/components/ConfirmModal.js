import React from 'react'

const ConfirmModal = ({handleConfirm, id}) => {
    return (
        <div><div>
            <input type="checkbox" id="confirm-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-primary">Alert!</h3>
                    <p className="py-4">Are you sure about this action?</p>
                    <div className="modal-action">
                        <label htmlFor="confirm-modal" className="btn">Cancel</label>
                        <button onClick={() => handleConfirm(id)} className="ml-3 btn btn-primary text-white">Confirm</button>
                    </div>
                </div>
            </div>
        </div></div>
    )
}

export default ConfirmModal