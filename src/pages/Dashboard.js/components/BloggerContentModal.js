import React from 'react'

const BloggerContentModal = ({data}) => {
    const{body, title} = data

    return (
        <div>
            <input type="checkbox" id="blog-content-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-11/12 max-w-5xl relative">
                    <label htmlFor="blog-content-modal" className="btn btn-sm btn-error btn-circle absolute right-2 top-2">✕</label>
                    <div>
                        <h3 className='text-3xl font-bold mb-4'>{ title}</h3>
                        {/* blog body */}
                        <div className='mt-2 text-[16px]' dangerouslySetInnerHTML={{ __html: body }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BloggerContentModal