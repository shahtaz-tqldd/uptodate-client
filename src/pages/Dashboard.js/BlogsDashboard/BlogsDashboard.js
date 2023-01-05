import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { MdDelete } from 'react-icons/md'
import DeleteModal from '../components/DeleteModal'

const BlogsDashboard = () => {
  const [id, setId] = useState(null)
  const { data: blogs = [], refetch } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/blogs')
      const data = await res.json()
      return data;
    }
  })
  const handleDelete = id => {
    fetch(`http://localhost:5000/blogs/${id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(() => {
        toast.success('Blog deleted successfully!')
        refetch()
        setId(null)
      })
  }
  return (
    <div className="ml-10 w-[150%]">
      <h2 className='font-bold text-2xl text-primary mt-6 mb-4 uppercase'>Bloggers</h2>
      {
        blogs.length ?
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Blog Title</th>
                <th>Details</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog, index) => <tr key={index}>
                <th>{index + 1}</th>
                <td>
                  
                  <div>
                      <div className="font-bold">{blog.title}</div>
                      <div className="text-sm opacity-50">{blog.category}</div>
                    </div>
   
                </td>
                <th>
                  <button className="btn btn-ghost btn-xs">Details</button>
                </th>
                <th>
                  <label htmlFor='delete-modal' onClick={() => setId(blog._id)} className="cursor-pointer text-2xl text-error"><MdDelete /></label>
                </th>
              </tr>
              )}
            </tbody>
          </table>
          : <h2 className='text-3xl mt-12'>No Bloggers!</h2>
      }
      {
        id &&
        <DeleteModal handleDelete={handleDelete} id={id} />
      }
    </div>
  )
}

export default BlogsDashboard