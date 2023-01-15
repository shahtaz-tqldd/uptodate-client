import React from 'react'
import { GrFormAdd } from 'react-icons/gr'

const PaymentCondition = () => {
    const answers = [
        {
            "id": 1,
            "ques": "From where money comes to your blog?",
            "ans": "Google Adsense"
        },
        {
            "id": 2,
            "ques": "How does Google Adsense work?",
            "ans": "Google Adsense show you add. And for 1000 visits of your blog you get 100taka"
        },
        {
            "id": 3,
            "ques": "How much you will get paid for your content?",
            "ans": "80% of the money earned!"
        },
        {
            "id": 4,
            "ques": "How will you receive money?",
            "ans": "If your blog gets 1k hits you will get access to the Ask for payment button in your blog dashboard"
        },
        {
            "id": 5,
            "ques": "What happens if your blog keep earning money?",
            "ans": "After asking for the first payment, you will get 50% of the payment for your second and last payment. So further you wait more you get"
        },
    ]
    return (
        <section className='max-w-[1250px] mx-auto pt-4 mb-16 px-4'>
            <h1 className='text-3xl font-bold mt-5'>Terms and Condition of Payment from <span className='text-error'>Hash Read</span></h1>
            <div className='flex flex-col gap-8 mt-10'>
                {
                    answers.map(answer=><div key={answer.id}>
                        <h2 className='text-xl font-bold flex items-center gap-2'><GrFormAdd className='text-base-content' />{answer.ques}</h2>
                        <p className='ml-7'>{answer.ans}</p>
                    </div>)
                }
            </div>
            <div className='mt-16'>
                <h2 className='text-lg font-bold text-info'>For more enquery Email us <br/><span className='font-normal'>hashread@gmail.com</span></h2>
            </div>
        </section>
    )
}

export default PaymentCondition