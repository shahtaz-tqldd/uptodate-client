import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthProvider'
import useGetBloggerId from '../../hooks/useGetBloggerId'
import useTitle from '../../hooks/useTitle'

const Dashboard = () => {
  useTitle('Dashboard')
  const { user } = useContext(AuthContext)
  const [bloggerId] = useGetBloggerId(user?.email)
  const { data: userData=[]} = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
        const res = await fetch(`http://localhost:5000/user/${user?.email}`)
        const data = res.json()
        return data
    }
})
  return (
    <div className='flex ml-10 mt-6'>
      <div className='flex gap-2 items-center bg-white p-2 rounded-xl'>
        <figure>
          <img src={user?.photoURL} alt="" className='h-52 w-36 rounded-lg object-cover' />
        </figure>
        <div className='px-12'>
          <h2 className='text-2xl font-bold text-neutral mt-3'>{user?.displayName}</h2>
          <p>{userData?.speciality}</p>
          <Link to={`/blogger/${bloggerId}`}><button className='btn btn-primary normal-case text-white rounded px-6 text-white mt-6'>Blogger Profile</button></Link>
        </div>
      </div>

    </div>
  )
}

export default Dashboard