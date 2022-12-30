import React from 'react'
import useTitle from '../../hooks/useTitle'

const ErrorPage = () => {
    useTitle('404 Error')
    return (
        <div className='flex flex-col justify-center items-center' style={{minHeight:'65vh'}}>
            <h1 className='text-5xl font-bold text-primary'>404 ERROR</h1>
            <p className='text-2xl mt-4'>Page not Found!</p>
        </div>
    )
}

export default ErrorPage