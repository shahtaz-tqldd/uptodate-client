import { format } from 'date-fns'
import React, { useContext, useState } from 'react'
import { toast } from 'react-hot-toast'
import { AuthContext } from '../../../context/AuthProvider'
import useTitle from '../../../hooks/useTitle'
import { RxDotFilled } from 'react-icons/rx'
import { MdRemoveCircle } from 'react-icons/md'
import DeleteModal from '../components/DeleteModal'

const CategoriesPage = () => {
    useTitle('Blogs Category')
    const { user, categories, refetch } = useContext(AuthContext)
    const [id, setId] = useState(null)
    const [addCategory, setAddCategory] = useState(false)
    const date = format(new Date(), 'PP')
    
    console.log(categories)
    const handleAddCategory = e => {
        e.preventDefault()
        const category = e.target.category.value
        const categoryInfo = {
            category,
            date,
            addedBy: user?.email
        }
        console.log(categoryInfo)
        fetch('https://dev-blog-server.vercel.app/blogs/categories', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(categoryInfo)
        })
            .then(res => res.json())
            .then(() => {
                toast.success('Category added successfully!')
                setAddCategory(false)
                refetch()
            })
    }

    const handleRemoveCategory = (id) => {
        fetch(`https://dev-blog-server.vercel.app/blogs/categories/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(() => {
                toast.success("Category successfully removed")
                setId(null)
                refetch()
            })
    }
    return (
        <div className='ml-10'>
            <h2 className='font-bold text-xl text-primary mt-6 mb-5'>All Categories</h2>
            <ul className='mb-6 flex flex-col gap-2'>
                {
                    categories?.map(category => <li key={category._id}
                        className='text-lg font-bold flex items-center gap-2 text-neutral'>
                        <RxDotFilled />{category.category}
                        <label htmlFor='delete-modal' onClick={() => setId(category._id)} className="cursor-pointer flex items-center text-error text-sm font-normal gap-1 ml-3"><MdRemoveCircle className='mt-1' />remove</label>
                    </li>

                    )
                }
            </ul>
            {
                addCategory ?

                    <form onSubmit={handleAddCategory} className='flex gap-3'>
                        <input type="text" name="category" placeholder="Add a new Category" className="input input-bordered w-full max-w-xs" required />
                        <input type="submit" value="Add +" className='btn btn-primary rounded-full px-6 normal-case' />
                        <span onClick={() => setAddCategory(false)} className='btn -ml-2 btn-ghost normal-case rounded-full px-6'>Cancel</span>
                    </form>
                    :
                    <button onClick={() => setAddCategory(!addCategory)} className='btn btn-primary normal-case rounded-full'>Add a new Category</button>
            }
            {
                id &&
                <DeleteModal id={id} handleDelete={handleRemoveCategory} />
            }
        </div>
    )
}

export default CategoriesPage