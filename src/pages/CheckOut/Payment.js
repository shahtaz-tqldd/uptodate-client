import { format } from 'date-fns'
import React, { useContext } from 'react'
import { HiLightBulb } from 'react-icons/hi'
import { AuthContext } from '../../context/AuthProvider'
import useTitle from '../../hooks/useTitle'

const Payment = () => {
    useTitle('Payment')
    const { user } = useContext(AuthContext);

    const date = format(new Date(), 'PP');
    const time = format(new Date(), 'p');

    const handlePayment = () => {
        const paymentInfo = {
            paidBy: user?.displayName,
            paidEmail: user?.email,
            date,
            time,
        }
        fetch('http://localhost:5000/payment/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(paymentInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.url) {
                    window.location.replace(data.url)
                }
            })
    }
    return (
        <section className='max-w-[1250px] mt-24 mx-auto px-4'>
            <h3 className='text-5xl text-primary font-bold'>Congratulations!</h3>
            <p className='mt-5 text-lg lg:w-2/3'>You have an amazing writing skills. Your Blog has been approved from the <span className='text-primary font-bold'>Hash Read</span>. We would love to have you to be our one of creative Hash Read Blogger.</p>

            <div className='mt-16 text-lg'>
                <h2>Please Pay your Registration Fee to proceed!</h2>
                <div className='mt-4 mb-6 text-neutral'><span className='text-5xl font-bold'>BDT 200</span>/year</div>
                <button onClick={handlePayment} className='btn btn-primary normal-case rounded px-8 text-white'>Pay Now</button>
                <a href='/payment-condition' target='_blank' rel="noreferrer"
                    className='text-red-600 hover:text-red-400 my-3 mt-12 flex items-center gap-2'><HiLightBulb />Terms and Conditions of Hash Read
                </a>
            </div>
        </section>
    )
}

export default Payment