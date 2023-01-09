import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const Dashboard = () => {
  const { user } = useContext(AuthContext)
  return (
    <div className='flex ml-10 mt-6'>
      <div>
        <figure>
          <img src={user?.photoURL} alt="" className='rounded-full h-36 w-36 object-cover' />
        </figure>
        <div>
          <h2 className='text-2xl font-bold text-neutral mt-3'>{user?.displayName}</h2>
        </div>
      </div>

    </div>
  )
}

export default Dashboard