import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthProvider'

const Footer = () => {
    const { categories } = useContext(AuthContext)
    const menuItems = <>
        {
            categories?.map((c, i) => <Link key={i} to='/' className="link text-xs link-hover">{c.category}</Link>)
        }
    </>
    return (
        <section className='bg-primary'>
            <footer className="footer max-w-[1250px] mx-auto p-10 text-white">
                <div>
                    <span className="footer-title">Categories</span>
                    {menuItems}
                </div>
                <div>
                    <span className="footer-title">Hash Read</span>
                    <Link to='/blogger-request' className="link link-hover">Write Blogs</Link>
                    <Link to='/' className="link link-hover">About us</Link>
                    <Link to='/' className="link link-hover">Contact</Link>

                    <span className="footer-title mt-8">Legal</span>
                    <a href='/payment-condition' target="_blank" rel="noreferrer" className="link link-hover">Terms of Payment</a>
                    <Link to='/' className="link link-hover">Privacy policy</Link>
                    <Link to='/' className="link link-hover">Cookie policy</Link>
                </div>
                <div>
                    <span className="footer-title">Newsletter</span>
                    <p>Subscribe and get regular notification from Hash Read</p>
                    <div className="form-control w-80">
                        <label className="label">
                            <span className="label-text">Enter your email address</span>
                        </label>
                        <div className="relative">
                            <input type="text" placeholder="username@site.com" className="input input-bordered w-full pr-16" />
                            <button className="btn btn-secondary absolute top-0 right-0 rounded-l-none">Subscribe</button>
                        </div>
                    </div>
                </div>
            </footer>
            <p className='text-[#fec] text-center text-sm pb-10'>All rights reserved by &copy; 2023 Hash Read</p>
        </section>
    )
}

export default Footer