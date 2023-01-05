import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthProvider'
import useAdmin from '../hooks/useAdmin'
import useBlogger from '../hooks/useBlogger'

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const [isAdmin, isAdminLoading] = useAdmin(user?.email)
    const [isBlogger, isBloggerLoading] = useBlogger(user?.email)
    const location = useLocation();
    if (loading || (isAdminLoading || isBloggerLoading) ) {
        return <h2>Loading...</h2>
    }
    if (user && (isAdmin || isBlogger)) {
        return children;
    }
    return <Navigate to='/' state={{ from: location }} replace />
}

export default AdminRoute