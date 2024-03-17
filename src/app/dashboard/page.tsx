"use client"
import React from 'react'
import { useRouter } from 'next/navigation'

const Dashboard = () => {
  const router = useRouter()
  return (
    <main className='flex flex-col min-h-screen w-full'>
      <section className='flex flex-col px-4 py-2'>
        <div>
          <h1 className='text-xl'>Welcome to admin dashboard</h1>
        </div>
        <button className='py-2 px-4 bg-[#042e49] rounded-lg text-white font-medium mt-2' onClick={() => {
          router.push('/admin/create')
        }}>
          Create new post
        </button>
        <button className='py-2 px-4 bg-[#042e49] rounded-lg text-white font-medium mt-2' onClick={() => {
          router.push('/admin/delete')
        }}>
          Delete Posts
        </button>
        <button className='py-2 px-4 bg-[#042e49] rounded-lg text-white font-medium mt-2' onClick={() => {
          router.push('/admin/update')
        }}>
          Update Post
        </button>
        <button className='py-2 px-4 bg-[#042e49] rounded-lg text-white font-medium mt-4'>
          See post stats
        </button>
      </section>
    </main>

  )
}

export default Dashboard
