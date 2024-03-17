"use client"
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { IoMdMenu } from "react-icons/io";
import { IoClose } from 'react-icons/io5';
import { GoHome } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import Link from 'next/link';
import { ThemeContext } from '../context/ThemeContext';
import { useRouter } from 'next/navigation'
import { BiHome, BiSearch } from 'react-icons/bi';
import { MdOutlineDashboard } from "react-icons/md";

const Navbar = () => {
  const router = useRouter()
  const { session, setSession, clicked } = useContext(ThemeContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  const handleLogOut = async () => {
    try {
      const res = await fetch('/api/auth/credentials/logout')

      if (res.status === 200){
        setSession(null)
        router.push('/')
      }
    } catch (error) {
      console.error(error)
    }

  }
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch('/api/auth/token')
        const resJSON = await response.json()
        if (resJSON.email && resJSON.username){
          setSession(resJSON)
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchSession()
  }, [])



  return (
    <nav className='w-full  flex justify-between py-2 px-4 items-center border-solid border-white border-b-sky-900 border-2 lg:px-12'>
      <div className='flex items-center justify-center'>
        <Image src={'/logo.png'} width={140} height={30} alt='logo' onClick={() => router.push('/')} className='cursor-pointer'/>
      </div>
      <div className='hidden lg:flex '>
        <ul className='flex list-none gap-x-4 text-[#3E4C5C] '>
            <li><Link href={'/'} className=' no-underline font-medium text-[#3E4C5C] flex items-center gap-x-1 justify-center hover:text-blue-600'><GoHome className='w-5 h-5'/>Home</Link></li>
            <li><Link href={'/search'} className='text-[#3E4C5C] font-medium no-underline flex items-center justify-center gap-x-1 hover:text-blue-600'><IoIosSearch className='w-5 h-5'/>Busqueda</Link></li>
            {!session && clicked &&(
            <>
              <li><Link href={'/login'} className='text-[#3E4C5C] font-medium no-underline hover:text-blue-600'>Login</Link></li>
              <li><Link href={'/register'} className='text-[#3E4C5C] font-medium no-underline hover:text-blue-600'>Register</Link></li>
            </>)}

            {session && (
            <>
              <li><Link href={'/dashboard'} className='text-[#3E4C5C] font-medium no-underline flex items-center justify-center gap-x-1 hover:text-blue-600'><MdOutlineDashboard />Dashboard</Link></li>
            </>)}
        </ul>
      </div>
      {session && (
        <div className='hidden lg:flex gap-x-2'>
          <p>{session.username}</p>
          <button onClick={handleLogOut} className='text-red-500'>Log out</button>
        </div>
      )}
      <div className='flex justify-center items-center lg:hidden'>
        <IoMdMenu className='w-7 h-7 text-[#3E4C5C] cursor-pointer' onClick={handleClick}/>
      </div>
    {isMenuOpen && (
      <>
        <div className='h-full opacity-50 bg-black absolute w-full top-0 right-0 z-10'></div>
        <div className='absolute bg-white w-2/3 h-full right-0 top-0 z-20 flex flex-col px-4 py-3'>
          <IoClose  className='w-6 h-6 self-end cursor-pointer' onClick={handleClick}/>
          <ul className='flex flex-col list-none gap-y-2 text-[#3E4C5C] '>
            <li><Link href={'/'} className=' no-underline font-medium text-[#3E4C5C] flex justify-center items-center gap-x-1 hover:text-blue-600'><GoHome className='w-5 h-5'/>Home</Link></li>
            <li><Link href={'/search'} className='text-[#3E4C5C] font-medium no-underline flex justify-center items-center gap-x-1 hover:text-blue-600'><IoIosSearch className='w-5 h-5'/>Busqueda</Link></li>
            { !session && clicked &&(<>
            <li><Link href={'/login'} className='text-[#3E4C5C] font-medium no-underline hover:text-blue-600'>Login</Link></li>
            <li><Link href={'/register'} className='text-[#3E4C5C] font-medium no-underline hover:text-blue-600'>Register</Link></li>
            </>)}
            { session && (
            <>
              <li ><Link href={'/dashboard'} className='text-[#3E4C5C] font-medium no-underline hover:text-blue-600'><MdOutlineDashboard />Dashboard</Link></li>         
              <li className='text-[#3E4C5C] font-medium no-underline' onClick={handleLogOut}>Log out</li>
            </>)}
          </ul>
        </div>
      </>
    )}
    </nav>
  )
}

export default Navbar
