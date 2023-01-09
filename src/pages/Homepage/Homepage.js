import React from 'react'
import useTitle from '../../hooks/useTitle'
import Blogs from '../Blogs/Blogs'
import SearchBar from './components/SearchBar'

const Homepage = () => {
    useTitle('Home')
    return (
        <div>
            <SearchBar />
            <section className='max-w-[1250px] mx-auto px-4'>
                {/* <Categories setCategory={setCategory} category={category} /> */}
                <Blogs />
            </section>
        </div>
    )
}

export default Homepage