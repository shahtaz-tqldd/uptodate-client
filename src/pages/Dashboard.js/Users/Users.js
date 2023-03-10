import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import Loader from '../../../components/Loader/Loader'
import DeleteModal from '../components/DeleteModal'
const Users = () => {
  const [id, setId] = useState(null)
  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('https://dev-blog-server.vercel.app/users')
      const data = await res.json()
      return data;
    }
  })
  const handleDelete = id => {
    fetch(`https://dev-blog-server.vercel.app/users/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(() => {
        toast.success('User deleted successfully')
        refetch()
        setId(null)
      })
  }
  if (isLoading) {
    return <Loader />
  }


  return (
    <div className="ml-10 w-[150%]">

      <h2 className='font-bold text-2xl text-base-content mt-6 mb-4 uppercase'>All Users</h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Role</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => <tr key={index}>
            <th>{index + 1}</th>
            <td>
              <div className="flex items-center space-x-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img src={user.photoURL} alt={user.displayName} />
                  </div>
                </div>
                <div>
                  <div className="font-bold">{user.displayName}</div>
                  <div className="text-sm opacity-50">{user.email}</div>
                </div>
              </div>
            </td>
            <th>
              <span className='text-sm uppercase text-info'>{user.role === 'blogger' && 'Blogger'}</span>
            </th>
            <th>
              <label htmlFor='delete-modal' onClick={() => setId(user._id)}
                className="cursor-pointer pl-4">
                <lord-icon
                  src="https://cdn.lordicon.com/jmkrnisz.json"
                  colors="primary:#ee6d66"
                  trigger="hover"
                  style={{ width: "25px", height: "25px" }}>
                </lord-icon>
              </label>
            </th>
          </tr>
          )}
        </tbody>
      </table>
      {
        id &&
        <DeleteModal handleDelete={handleDelete} id={id} />
      }
    </div>
  )
}

export default Users