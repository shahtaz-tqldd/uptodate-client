import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { MdRemoveCircle } from 'react-icons/md'
import Loader from '../../../components/Loader/Loader'
import useTitle from '../../../hooks/useTitle'
import DeleteModal from '../components/DeleteModal'

const Bloggers = () => {
  useTitle('Bloggers')
  const [id, setId] = useState(null)
  const { data: bloggers = [], refetch, isLoading } = useQuery({
    queryKey: ['bloggers'],
    queryFn: async () => {
      const res = await fetch('https://dev-blog-server.vercel.app/bloggers')
      const data = await res.json()
      return data;
    }
  })
  const handleDelete = id => {
    fetch(`https://dev-blog-server.vercel.app/bloggers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(() => {
        toast.success('Blogger removed successfully')
        refetch()
        setId(null)
      })
  }
  if (isLoading) {
    return <Loader />
  }
  return (
    <div className="ml-10 w-[150%]">
      <h2 className='font-bold text-2xl text-base-content mt-6 mb-4 uppercase'>Bloggers</h2>
      {
        bloggers.length ?
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Details</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {bloggers.map((blogger, index) => <tr key={index}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={blogger.photoURL} alt={blogger.displayName} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{blogger.displayName}</div>
                      <div className="text-sm opacity-50">{blogger.email}</div>
                    </div>
                  </div>
                </td>
                <th>
                  <a href={`/blogger/${blogger._id}`} target="_blank" rel="noreferrer" className="text-info hover:text-primary text-sm">See Profile</a>
                </th>
                <th>
                  <label htmlFor='delete-modal' onClick={() => setId(blogger._id)} className="cursor-pointer flex items-center text-error text-sm gap-1">Remove<MdRemoveCircle className='mt-1' /></label>
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

export default Bloggers