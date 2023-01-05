import React from 'react';
import useTitle from '../../hooks/useTitle';
import BloggerRequestModal from './BloggerRequestModal';

const BloggerRequestPage = () => {
    useTitle('Be a Blogger')
   
    return (
        <section className='max-w-[1250px] mx-auto px-4'>
            <div className="h-[600px] mt-20 rounded-xl" style={{
                backgroundImage: `url("https://world.edu/wp-content/uploads/2020/07/writing-great-blogs.jpg")`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
            }}>
                <div className="gradient w-full h-full rounded-xl flex justify-center items-center">
                    <div className="text-center text-white">
                        <h1 className="text-5xl font-bold text-success">Want to write Blogs?</h1>
                        <p className="py-6 text-lg">Do you love to speak with your words to the people? Write blogs in <span className='font-bold text-warning'>Uptodate Blogs</span></p>
                        <label htmlFor='request-modal' className='btn btn-outline btn-secondary'>Send Request</label>
                    </div>
                </div>
            </div>
            <BloggerRequestModal />
        </section>
    )
}
export default BloggerRequestPage