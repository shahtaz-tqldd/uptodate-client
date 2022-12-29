import React, { useContext } from 'react'
import { toast } from 'react-hot-toast'
import { FcGoogle } from 'react-icons/fc'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthProvider'
import { addToDB } from '../../functions/addUserToDB'
const GoogleLogin = () => {
  const { googleLogin } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'
  const handleGoogleLogin = () => {
    googleLogin()
      .then(result => {
        console.log(result.user)
        const dbUserInfo = {
          displayName: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL
        }
        toast.success("Login with google successfull!")
        addToDB(dbUserInfo)
        navigate(from, { replace: true })
      })
      .catch(err => console.error(err))
  }
  return (
    <button onClick={handleGoogleLogin} className='btn btn-outline btn-primary w-full normal-case rounded-md mt-3 mb-4'>
      <FcGoogle /> &nbsp;
      Continue with Google
    </button>
  )
}

export default GoogleLogin