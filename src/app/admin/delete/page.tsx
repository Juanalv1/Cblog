"use client"
import ErrorMesssage from '@/app/components/ErrorMessage'
import SuccessMesssage from '@/app/components/SuccessMesssage'
import { useState, FormEvent } from 'react'


type PostType ={
  post_id: number
  post_title: string
  content: string
  banner_url?: string
  preview_description: string
}

const Delete = () => {
  const [success, setSuccess] = useState<string>()
  const [error, setError] = useState<string>()
  const [post, setPost] = useState<PostType>()
  const [id, setId] = useState<Number>()
  const fetchData = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_API_DEV}/posts/id/${id}`)
      const resJSON = await res.json()
      if (res.ok) {
        console.log(resJSON)
        setPost(resJSON)
      } else {
        setError('Error fetching post')
        setTimeout(() => {
          setError(undefined)
        }, 4000)
      }
    } catch (error) {
      console.error(error)
      setError('Error fetching post')
      setTimeout(() => {
        setError(undefined)
      }, 4000);
    }
  }
  const handleClick = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_API_DEV}/posts/delete/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      })
      const resJSON = await res.json()
      if (res.ok) {
        setSuccess('Post borrado exitosamente')
        setTimeout(() => {
          setSuccess(undefined)
        }, 4000);
      } else {
        setError('Error al borrar el Post')
        setTimeout(() => {
          setError(undefined)
        }, 4000);
      }
      console.log(resJSON)
    } catch (error) {
      setError('Error al borrar el Post')
      setTimeout(() => {
        setError(undefined)
      }, 4000);
    }

  }
  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setId(Number(e.currentTarget.value))
  }
  return (
    <main>
      {error && (<ErrorMesssage text={error}/>)}
      {success && (<SuccessMesssage text={success}/>)}
      <section className='flex flex-col gap-y-2 px-6 py-2'>
        <h1>Insert post id to delete</h1>
        <input type='number' className='outline-none px-2 py-1 border-2 border-solid border-neutral-600 rounded-lg' placeholder='Id....' onChange={handleChange}/>
        <button className=' bg-green-700 px-2 py-2 rounded-lg font-medium text-white' onClick={fetchData}>Fetch post</button>
        {post && (
        <div className='flex flex-col gap-y-4'>
          <p>Titulo del post: <b>{post.post_title}</b></p>
          <button className=' bg-red-500 px-2 py-2 rounded-lg font-medium text-white' onClick={handleClick}>Delete</button>
        </div>

        )}
      </section>
    </main>

  )
}

export default Delete
