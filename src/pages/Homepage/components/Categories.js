import React, { useState } from 'react'

const Categories = () => {
    const [category, setCategory] = useState('All')
    const categories = [
        "All",
        "Lifestyle",
        "Technology",
        "Science",
        "Philosophy",
        "Art",
        "Culture",
        "Education"
    ]
    return (
        <div className='flex gap-6 mb-8 text-white sticky top-2'>
            {categories.map((c, i) => <button onClick={() => setCategory(c)}
                className={`px-4 py-1 rounded-full hover:bg-error ${c===category? 'bg-error': 'bg-neutral' }`}
                key={i}>
                {c}
            </button>)}
        </div>
    )
}

export default Categories