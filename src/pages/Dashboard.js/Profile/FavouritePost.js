import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthProvider'
import { BsHeartFill } from 'react-icons/bs'
import { RiPenNibLine } from 'react-icons/ri'
import { toast } from 'react-hot-toast'
import useTitle from '../../../hooks/useTitle'

const FavouritePost = () => {
    useTitle('Favourite Post')
    const { user } = useContext(AuthContext)
    const { data: favourites = [], refetch } = useQuery({
        queryKey: ['favourites'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/blogs/favourites/${user?.email}`)
            const data = await res.json()
            return data
        }
    })
    const handleDeleteFavourite= (id) => {
        fetch(`http://localhost:5000/blogs/favourites/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then((data) => {
                if (data.acknowledged) {
                    toast.success("Favourite post removed")
                    refetch()
                }
            })
    }
    return (
        <section className='max-w-[1250px] mx-auto mt-24 px-4 min-h-[70vh]'>
            <h2 className='text-3xl font-bold'>Your Favourite Posts</h2>
            <div className='grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6 mt-12'>
                {
                    favourites.length ?
                        favourites.map(favourite => <div className='p-5 rounded-lg bg-white hover:shadow-xl hover:bg-accent relative'>
                            <h2 className='font-bold text-lg'>{favourite.postTitle}</h2>
                            <BsHeartFill className='absolute -top-[7px] text-error text-xl' />
                            <div className='flex justify-between'>
                                <p className='flex items-center gap-2 -mt-5'><RiPenNibLine /> {favourite.postAuthor}</p>
                                <div className='mt-5'>
                                    <button className='btn btn-info normal-case btn-sm text-white rounded mr-2'><Link to={`/blogs/${favourite.postId}`}>See this Post</Link></button>
                                    <button onClick={() => handleDeleteFavourite(favourite._id)} className='btn btn-ghost normal-case btn-sm text-error rounded'>Remove</button>
                                </div>
                            </div>
                        </div>)
                        : <h2 className='text-primary text-xl'>You have no favourite post!</h2>
                }
            </div>
        </section>
    )
}

export default FavouritePost