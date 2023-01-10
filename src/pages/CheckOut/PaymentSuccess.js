import React from 'react'
import { useNavigate } from 'react-router-dom'
import success from '../../assets/icons/success.png'
import useTitle from '../../hooks/useTitle'

const PaymentSuccess = () => {
    useTitle('Payment Success')
    const navigate = useNavigate()
    const handleDashboard = () => {
        navigate('/dashboard')
    }
    return (
        <section className='max-w-[1250px] mt-24 mx-auto px-4'>
            <div className='flex items-center justify-center w-full h-[80vh]'>
                <div className='bg-white rounded-xl shadow-xl p-16 flex flex-col items-center'>
                    <img src={success} alt="" className="h-24 w-24"/>
                    <h3 className='text-4xl text-primary font-bold mt-5'>Payment Successful!</h3>
                    <p className='max-w-[400px] mt-5'>Welcome! Now you are an active blogger of Hash Read for one year. Read, Write, Earn and Grow!</p>
                    <button onClick={handleDashboard} className='btn btn-primary rounded normal-case text-white mt-12'>Go to Dashboard</button>
                </div>
            </div>
        </section>
    )
}

export default PaymentSuccess