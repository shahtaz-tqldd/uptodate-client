import React from 'react'
import useTitle from '../../hooks/useTitle'
import Blogs from '../Blogs/Blogs'
import TopBanner from './components/TopBanner'

const Homepage = () => {
    useTitle('Home')
    return (
        <div>
            <TopBanner />
            <section className='max-w-[1250px] mx-auto px-4 mb-16'>
                <Blogs />
            </section>
        </div>
    )
}

export default Homepage