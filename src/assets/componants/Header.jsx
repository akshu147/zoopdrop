import React, { useEffect } from 'react'

import AOS from 'aos'
import 'aos/dist/aos.css' // Import AOS styles
import { BsMenuButtonFill } from 'react-icons/bs'
import logo from '../images/logo.png'
import { Link } from 'react-router-dom'

const Header = () => {
  useEffect(() => {
    AOS.init({ duration: 500, once: false })
  }, [])

  return (
    <>
      <header className='rounded-[8px] text-white flex justify-between p-[10px_20px] items-center m-[20px_10px] md:m-[20px_40px] lg:m-[40px_100px]'>
        <figure className='w-[80px]' data-aos='fade-right'>
          <img src={logo} className='w-full' alt='' />
        </figure>

        <div className='' data-aos='fade-down'>
          <i className='block md:hidden text-white text-[25px]'>
            <BsMenuButtonFill />
          </i>
          <nav className='hidden md:block'>
            <ul className='p-[10px_15px] flex gap-[40px] text-[15px] border-[1px] border-slate-400 rounded-[10px]'>
              <li className='cursor-pointer'>Contact Us</li>
              <li className='cursor-pointer'>Your Smile</li>
              <li className='cursor-pointer'>Blog</li>
              <li className='cursor-pointer'>Safety</li>
              <li className='cursor-pointer'>Store</li>
            </ul>
          </nav>
        </div>
      
      </header>
    </>
  )
}

export default Header
