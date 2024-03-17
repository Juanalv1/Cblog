"use client"
import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

const Footer = () => {
  const { handleClicks } = useContext(ThemeContext)
  return (
    <div className='flex flex-col w-full py-10 lg:py-20 px-8 items-center justify-cente bg-slate-200'>
      <img src='/logo.png' className='w-48 py-2' onClick={handleClicks}/>
      <p className=''>2024 CriptoBro, All rights reserved</p>
    </div>
  )
}

export default Footer
