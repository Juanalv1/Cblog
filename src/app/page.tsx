"use client"
import { useContext } from 'react'
import { ThemeContext } from './context/ThemeContext'
import Image from 'next/image'
import Navbar from './components/Navbar'
import PostCard from './components/PostCard'

export default function Home() {
  const { posts } = useContext(ThemeContext)
  return (
    <main className="flex min-h-screen flex-col">
      <section className='w-full h-72 flex flex-col bg-gradient-to-br from-[#014B79] to-[#48719f] text-white justify-center items-center px-12 py-2 lg:h-96'>
        <p className='text-3xl font-semibold flex text-white text-center lg:text-4xl'>Noticias y Tendencias del mundo Cripto</p>
      </section>
      <section className='flex flex-col px-8 py-6'>
        <h2 className='text-2xl font-semibold text-[#042e49] mb-4'>Entradas recientes</h2>
        <div className='grid gap-y-6 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 place-items-center md:gap-y-10'>
          {posts && posts?.map((post, index) => (
            <PostCard description={post.preview_description} banner_url={post.banner_url} title={post.post_title} key={index}/>
          ))}
        </div>
      </section>
    </main>
  )
}
