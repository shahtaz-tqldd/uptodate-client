import React, { createContext, useEffect, useState } from 'react'
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from 'firebase/auth'
import { app } from '../firebase/firebase.config'
import { useQuery } from '@tanstack/react-query'
const auth = getAuth(app)

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)

    // create new user
    const emailRegister = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    // update user profile
    const updateUser = (userInfo) => {
        setLoading(true)
        return updateProfile(auth.currentUser, userInfo)
    }

    // login with email and password
    const emailLogin = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // logout
    const logout = () => {
        setLoading(true)
        return signOut(auth)
    }

    // forgot password
    const forgotPassword = (email) => {
        setLoading(true)
        return sendPasswordResetEmail(auth, email)
    }

    // google login
    const googleProvider = new GoogleAuthProvider()
    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => unsubscribe()
    }, [])

    // categories
    const { data: categories = [], refetch } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch('https://dev-blog-server.vercel.app/categories')
            const data = await res.json()
            return data
        }
    })
    const authInfo = {
        emailRegister,
        emailLogin,
        updateUser,
        logout,
        forgotPassword,
        googleLogin,
        user,
        loading,
        categories,
        refetch,
        search,
        setSearch
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider