import React, { useContext } from 'react';
import useTitle from '../../hooks/useTitle';
import BloggerRequestModal from './BloggerRequestModal';
import blogger from '../../assets/images/blogger.webp'
import { HiCheckCircle } from 'react-icons/hi'
import { IoMdSend } from 'react-icons/io'
import { AuthContext } from '../../context/AuthProvider';
import { Link, useLocation } from 'react-router-dom';
const lists = [
    'Send us a Blog Sample',
    'We will review you writings',
    'If you are good enough, you would be approved',
    'Pay Registration Fees after approval',
    'Awesome! Write Blogs and get paid'

]
const BloggerRequestPage = () => {
    useTitle('Be a Blogger')
    const { user } = useContext(AuthContext)
    const location = useLocation()

    return (
        <section className='-mb-12'>
            <div className="h-[100vh]" style={{
                backgroundImage: `url(${blogger})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
                <div className="gradient w-full h-full flex justify-start items-center">
                    <div className="lg:w-1/2 text-white lg:p-24 p-8">
                        <h1 className="text-[45px] font-bold text-info">Write Blogs in Hash Read</h1>
                        <p className="py-6 text-xl text-start">If you love to speak with your words and have an amazing writing skill, write blogs in <span className='font-bold text-warning'>Hash Read</span> and get paid!</p>
                        <ul className='p-4 text-secondary'>
                            {
                                lists.map((list, i) => <li key={i} className='flex items-center gap-2 py-1'><HiCheckCircle />{list}</li>)
                            }
                        </ul>
                        {
                            user?.email ?
                                <label htmlFor='request-modal' className='btn btn-outline btn-info mt-10'>Send Request&nbsp;<IoMdSend /></label>
                                : <h2 className='mt-10 text-lg'><Link to="/login" state={{from: location}} replace className='text-info hover:text-blue-500'>Sign In</Link> to send request </h2>
                        }
                    </div>
                </div>
            </div>
            <BloggerRequestModal />
        </section>
    )
}
export default BloggerRequestPage