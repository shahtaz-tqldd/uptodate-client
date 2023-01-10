import { useQuery } from '@tanstack/react-query'
import React, { useContext, useState } from 'react'
import { toast } from 'react-hot-toast'
import { MdRemoveCircle } from 'react-icons/md'
import Loader from '../../../components/Loader/Loader'
import { AuthContext } from '../../../context/AuthProvider'
import useTitle from '../../../hooks/useTitle'
import DeleteModal from '../components/DeleteModal'

const BlogsDashboard = () => {
  useTitle('Blogs')
  const {user} = useContext(AuthContext)
  const [id, setId] = useState(null)
  const { data: blogs = [], refetch, isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/dashboard/blogs/${user?.email}`)
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
  if (isLoading) {
    return <Loader />
  }
  return (
    <div className="ml-10 w-[120%]">
      <h2 className='font-bold text-2xl text-primary mt-6 mb-4 uppercase'>Bloggers</h2>
      {
        blogs.length ?
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Blog Title</th>
                <th>Author</th>
                <th>Link</th>
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
                <td>
                  <div className="text-md normal-case">{blog.author}</div>
                </td>
                <th>
                  <a href={`/blogs/${blog._id}`} target='_blank' rel="noreferrer" className='text-sm text-info hover:text-primary'>See this Blog</a>
                </th>
                <th>
                  <label htmlFor='delete-modal' onClick={() => setId(blog._id)} className="cursor-pointer flex items-center text-error text-sm gap-1">Remove<MdRemoveCircle className='mt-1' /></label>
                </th>
              </tr>
              )}
            </tbody>
          </table>
          : <h2 className='text-3xl mt-12'>No Blogs!</h2>
      }
      {
        id &&
        <DeleteModal handleDelete={handleDelete} id={id} />
      }
    </div>
  )
}

export default BlogsDashboard