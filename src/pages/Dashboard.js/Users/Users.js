import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { MdRemoveCircle } from 'react-icons/md'
import DeleteModal from '../components/DeleteModal'
const Users = () => {
  const [id, setId] = useState(null)
  const { data: users = [], refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/users')
      const data = await res.json()
      return data;
    }
  })
  const handleDelete = id => {
    fetch(`http://localhost:5000/users/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(() => {
        toast.success('User deleted successfully')
        refetch()
        setId(null)
      })
  }
  return (
    <div className="ml-10 w-[150%]">
      <h2 className='font-bold text-2xl text-primary mt-6 mb-4 uppercase'>All Users</h2>
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
              <span className='text-sm uppercase text-info'>{user.role ==='blogger' && 'Blogger'}</span>
            </th>
            <th>
              <label htmlFor='delete-modal' onClick={() => setId(user._id)} className="cursor-pointer flex items-center text-error text-sm gap-1">Remove<MdRemoveCircle className='mt-1' /></label>
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