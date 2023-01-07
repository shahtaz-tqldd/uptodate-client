import React, { useContext, useState } from 'react'
import { AuthContext } from '../../../context/AuthProvider'

const Categories = () => {
    const [category, setCategory] = useState('All')
    const { categories } = useContext(AuthContext)
    return (
        <div className='hidden md:flex lg:flex flex-wrap gap-6 mb-8 text-white sticky top-16 bg-base-100 z-10 py-3'>
            <button onClick={() => setCategory('All')} className={`px-4 py-1 rounded-full hover:bg-error ${'All'=== category ? 'bg-error' : 'bg-neutral'}`}>All</button>
            
            {categories?.map((c, i) => <button onClick={() => setCategory(c.category)}
                className={`px-4 py-1 rounded-full hover:bg-error ${c.category===category? 'bg-error': 'bg-neutral' }`}
                key={i}>
                {c.category}
            </button>)}
        </div>
    )
}

export default Categories