import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { MdDelete } from 'react-icons/md'
import DeleteModal from '../components/DeleteModal'

const Bloggers = () => {
  const [id, setId] = useState(null)
  const { data: bloggers = [], refetch } = useQuery({
    queryKey: ['bloggers'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/bloggers')
      const data = await res.json()
      return data;
    }
  })
  const handleDelete = id => {
    fetch(`http://localhost:5000/bloggers/${id}`, {
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
  return (
    <div className="ml-10 w-[150%]">
      <h2 className='font-bold text-2xl text-primary mt-6 mb-4 uppercase'>Bloggers</h2>
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
                  <button className="btn btn-ghost btn-xs">Details</button>
                </th>
                <th>
                  <label htmlFor='delete-modal' onClick={() => setId(blogger._id)} className="cursor-pointer text-2xl text-error"><MdDelete /></label>
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